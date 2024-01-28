import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(2).max(10),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;

export const test = "blabla";
