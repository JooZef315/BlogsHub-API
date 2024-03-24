import mongoose from "mongoose";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const toggleFollow = async (paramId: string, currentUserId: string) => {
  if (
    !mongoose.isValidObjectId(paramId) ||
    !mongoose.isValidObjectId(currentUserId)
  ) {
    throw new CustomError("not a valid Id", 400);
  }

  if (paramId === currentUserId) {
    throw new CustomError("you Can't follow yourself", 400);
  }

  const user = await User.findById(paramId);
  const currentUser = await User.findById(currentUserId);

  if (!user || !currentUser) {
    throw new CustomError("user not found", 404);
  }

  const isUserFollowed = currentUser.following.includes(user._id);

  if (isUserFollowed) {
    const currentUserFollowList = currentUser.following.filter(
      (id) => !id.equals(user._id)
    );
    currentUser.following = [...currentUserFollowList];
    await currentUser.save();

    const userFollowList = user.followers.filter(
      (id) => !id.equals(currentUser._id)
    );
    user.followers = [...userFollowList];
    await user.save();
  } else {
    currentUser.following.push(user._id);
    await currentUser.save();

    user.followers.push(currentUser._id);
    await user.save();
  }
};
