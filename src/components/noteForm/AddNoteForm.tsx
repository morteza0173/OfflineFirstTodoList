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
  await indexeddb.pendingTodos.clear();
  await indexeddb.pendingTodos.bulkAdd(todos);
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

    queryClient.setQueryData<LocalTodo[]>(["todos"], (old = []) => [
      ...old,
      indexeddbData,
    ]);

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
