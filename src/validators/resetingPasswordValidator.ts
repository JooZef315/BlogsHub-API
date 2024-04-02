import { generateZodCustomError } from "../utils/customErrors";
import { resetingPasswordZodSchema } from "./zodSchemas";
import { TResetingPassword, TZodError } from "./zodTypes";

export const validateresetingPassword = (reqData: TResetingPassword) => {
  const parsedData = resetingPasswordZodSchema.safeParse(reqData);
  if (!parsedData.success) {
    const error: TZodError = generateZodCustomError(parsedData.error);
    return { resetingPasswordData: null, error };
  } else {
    const resetingPasswordData: TResetingPassword = parsedData.data;
    return { resetingPasswordData, error: null };
  }
};
