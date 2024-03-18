import { z } from "zod";
import { userZodSchema } from "./zodSchemas";

export type TZodError = {
  message: string;
};

export type TUser = z.infer<typeof userZodSchema>;
