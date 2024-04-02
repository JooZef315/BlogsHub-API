import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";
import { TUser } from "../../validators/zodTypes";

export const editUser = async (id: string, userData: TUser) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  const existedUser = await User.findOne({
    $and: [
      { $or: [{ username: userData.username }, { email: userData.email }] },
      { _id: { $ne: user._id } },
    ],
  });

  if (existedUser) {
    throw new CustomError("username OR email already taken", 400);
  }

  const newHashedPassword = await bcrypt.hash(userData.password, 10);

  user.username = userData.username;
  user.email = userData.email;
  user.password = newHashedPassword;
  user.profilePicUrl = userData.profilePicUrl || user.profilePicUrl;

  const updatedUser = await user.save();

  return updatedUser;
};
