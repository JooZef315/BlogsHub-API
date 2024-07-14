import jwt from "jsonwebtoken";
import { CustomError } from "./customErrors";

export const verifyToken = (authHeader: string | undefined) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

  const token = authHeader?.split(" ")[1] || "";

  if (!token) {
    throw new CustomError("invalid token", 401);
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return payload;
  } catch (error: any) {
    throw new CustomError(error.message, 401);
  }
};
