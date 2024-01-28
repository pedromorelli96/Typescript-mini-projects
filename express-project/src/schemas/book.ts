import { z } from "zod";

export const bookSchema = z.object({
  id: z
    .number({
      coerce: true,
    })
    .int()
    .gt(0),
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  price: z.number().positive(),
});

export type Book = z.infer<typeof bookSchema>;
