import mongoose from "mongoose";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const getUser = async (id: string, full: boolean) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid id", 400);
  }

  let query = User.findById(id);

  if (full) {
    query = query
      .select(["username", "email"])
      .populate(["likes", "followers", "following"]);
  } else {
    query = query.select([
      "username",
      "email",
      "likes",
      "followers",
      "following",
    ]);
  }

  const user = await query.exec();

  return user;
};
