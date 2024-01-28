import { z } from "zod";

export const userSchema = z.object({
  id: z.string().cuid2(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must have a valid email format"),
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(5)
    .max(20),
});

export type User = z.infer<typeof userSchema>;
