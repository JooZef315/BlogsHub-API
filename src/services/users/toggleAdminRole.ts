import mongoose from "mongoose";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const toggleAdminRole = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  user.isAdmin = !user.isAdmin;
  await user.save();
};
