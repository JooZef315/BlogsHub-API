import mongoose from "mongoose";
import Blog from "../../models/blogModel";
import { CustomError } from "../../utils/customErrors";

export const getBlog = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid id", 400);
  }

  return 22;
};
