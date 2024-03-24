import { z } from "zod";
import { userZodSchema, blogZodSchema } from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TUser = z.infer<typeof userZodSchema>;

export type TBlog = z.infer<typeof blogZodSchema>;
