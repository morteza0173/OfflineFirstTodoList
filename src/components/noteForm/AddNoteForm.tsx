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

const AddNoteForm = () => {
  const form = useForm<z.infer<typeof addNoteFormSchema>>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: {
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof addNoteFormSchema>) {
    console.log(values);
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
        <Button type="submit" className="w-full" size={"lg"}>
          ثبت یادداشت
        </Button>
      </form>
    </Form>
  );
};
export default AddNoteForm;
