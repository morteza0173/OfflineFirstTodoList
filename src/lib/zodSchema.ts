import z from "zod";

export const addNoteFormSchema = z.object({
  note: z
    .string()
    .min(10, {
      message: "یادداشت باید حداثل شامل 10 کاراکتر باشد",
    })
    .max(30, {
      message: "یادداشت باید حداکثر شامل 30 کاراکتر باشد",
    }),
});
