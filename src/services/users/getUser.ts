import mongoose from "mongoose";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const getUser = async (id: String, full: Boolean) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid id", 400);
  }

  if (full) {
    const user = await User.findById(id)
      .select(["username", "email"])
      .populate(["likes", "followers", "following"]);
    return user ? user : {};
  } else {
    const user = await User.findById(id).select([
      "username",
      "email",
      "likes",
      "followers",
      "following",
    ]);
    return user ? user : {};
  }
};
