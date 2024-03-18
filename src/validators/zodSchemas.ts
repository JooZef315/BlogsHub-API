import { z } from "zod";

export const userZodSchema = z
  .object({
    username: z.string().min(1, { message: "username is required" }),
    email: z.string().email("This is not a valid email."),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPasswod: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    profilePicUrl: z.string().optional(),
  })
  .refine((data) => data.confirmPasswod === data.password, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
