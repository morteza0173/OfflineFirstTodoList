"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNoteFormSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import CustomInput from "../input/CustomInput";
import { PencilLine } from "lucide-react";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { indexeddb, LocalTodo } from "@/lib/indexeddb";
import { useQueryClient } from "@tanstack/react-query";

export async function savePendingTodos(todos: LocalTodo[]) {
  await indexeddb.pendingTodos.bulkPut(todos);
}

const AddNoteForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof addNoteFormSchema>>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: {
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addNoteFormSchema>) {
    const newId = uuidv4();
    const indexeddbData: LocalTodo = {
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
      title: values.note,
      pending: "add",
    };
    await savePendingTodos([indexeddbData]);

    const cachedTodos = queryClient.getQueryData<LocalTodo[]>(["todos"]);

    if (!cachedTodos || cachedTodos.length === 0) {
      const notes = await indexeddb.todos.toArray();
      const pendingNotes = await indexeddb.pendingTodos.toArray();

      const mergedMap: Record<string, LocalTodo> = {};
      [...notes, ...pendingNotes, indexeddbData].forEach((todo) => {
        if (todo.pending !== "delete") mergedMap[todo.id] = todo;
      });

      const merged = Object.values(mergedMap).sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      );

      queryClient.setQueryData<LocalTodo[]>(["todos"], merged);
    } else {
      queryClient.setQueryData<LocalTodo[]>(["todos"], (old = []) => {
        const mergedMap: Record<string, LocalTodo> = {};
        [...old, indexeddbData].forEach((todo) => {
          if (todo.pending !== "delete") mergedMap[todo.id] = todo;
        });
        return Object.values(mergedMap).sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
      });
    }

    window.dispatchEvent(new Event("new-todo"));

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="note"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  label="یادداشت شما"
                  icon={<PencilLine />}
                  {...field}
                />
              </FormControl>
              {!fieldState.error && (
                <FormDescription>بین 10 تا 30 حرف باشد </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"outline"}
          className="w-full"
          size={"lg"}
        >
          ثبت یادداشت
        </Button>
      </form>
    </Form>
  );
};
export default AddNoteForm;
