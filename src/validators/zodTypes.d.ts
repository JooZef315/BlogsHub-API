import { z } from "zod";
import { userZodSchema, blogZodSchema, commentZodSchema } from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TUser = z.infer<typeof userZodSchema>;

export type TBlog = z.infer<typeof blogZodSchema>;

export type TComment = z.infer<typeof commentZodSchema>;
