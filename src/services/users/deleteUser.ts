import mongoose from "mongoose";
import User from "../../models/userModel";
import Blog from "../../models/blogModel";
import Comment from "../../models/commentModel";
import { CustomError } from "../../utils/customErrors";

export const deleteUser = async (id: String) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  //delete user blogs
  const userBlogs = await Blog.find({ author: user._id });
  const userBlogsIds = userBlogs.map((b) => b._id);
  await Blog.deleteMany({ author: user._id });

  //delete user comments and comments on his blogs
  /* 
    TODO: delete nested comments
  */
  await Comment.deleteMany({
    blogId: { $in: userBlogsIds },
  });
  await Comment.deleteMany({ userId: user._id });

  //delete likes forn liked blogs
  await Blog.deleteMany({ likedBy: { $in: [user._id] } });

  //delete the users following the user
  const userFollowers = await User.find({ following: { $in: [user._id] } });
  const ar = userFollowers.map((userFollower) => {
    const followList = userFollower.following.filter((followerId) => {
      return !followerId.equals(user._id);
    });
    userFollower.following = [...followList];
    userFollower.save();
    return userFollower;
  });

  //delete the users followed by the user
  const userFollowings = await User.find({ followers: { $in: [user._id] } });
  const arr = userFollowings.map((userFollowing) => {
    const followList = userFollowing.followers.filter((followingId) => {
      return !followingId.equals(user._id);
    });
    userFollowing.followers = [...followList];
    userFollowing.save();
    return userFollowing;
  });

  const deletedUser = await user.deleteOne();

  return deletedUser;
};
