import { generateZodCustomError } from "../utils/customErrors";
import { commentZodSchema } from "./zodSchemas";
import { TComment, TZodError } from "./zodTypes";

export const validateComment = (reqData: TComment) => {
  const parsedData = commentZodSchema.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { commentData: null, error };
  } else {
    const commentData: TComment = parsedData.data;
    return { commentData, error: null };
  }
};
