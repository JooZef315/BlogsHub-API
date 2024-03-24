import { generateZodCustomError } from "../utils/customErrors";
import { blogZodSchema } from "./zodSchemas";
import { TBlog, TZodError } from "./zodTypes";

export const validateBlog = (reqData: TBlog) => {
  const parsedData = blogZodSchema.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { blogData: null, error };
  } else {
    const blogData: TBlog = parsedData.data;
    return { blogData, error: null };
  }
};
