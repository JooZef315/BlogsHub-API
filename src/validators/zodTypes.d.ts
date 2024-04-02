import { z } from "zod";
import {
  userZodSchema,
  blogZodSchema,
  commentZodSchema,
  resetingPasswordZodSchema,
} from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TUser = z.infer<typeof userZodSchema>;

export type TBlog = z.infer<typeof blogZodSchema>;

export type TComment = z.infer<typeof commentZodSchema>;

export type TResetingPassword = z.infer<typeof resetingPasswordZodSchema>;
