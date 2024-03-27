import mongoose from "mongoose";
import User from "../../models/userModel";
import Blog from "../../models/blogModel";
import Comment from "../../models/commentModel";
import { CustomError } from "../../utils/customErrors";
import { deleteComment } from "../comments/deleteComment";
import { deleteBlog } from "../blogs/deleteBlog";

export const deleteUser = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  //delete user comments, replies on them
  const userComments = await Comment.find({ userId: user._id });
  userComments.forEach((userComment) => {
    deleteComment(userComment.blogId.toString(), userComment._id.toString());
  });

  //delete user blogs, his blogs comments
  const userBlogs = await Blog.find({ author: user._id });
  userBlogs.forEach((userBlog) => {
    deleteBlog(userBlog._id.toString());
  });

  //delete likes forn liked blogs
  const blogsToUpdate: unknown[] = [];
  const likedBlogs = await Blog.find({ likedBy: { $in: [user._id] } });
  likedBlogs.forEach((likedBlog) => {
    const likesList = likedBlog.likedBy.filter((like) => {
      return !like.equals(user._id);
    });
    likedBlog.likedBy = [...likesList];
    blogsToUpdate.push(likedBlog.save());
  });
  await Promise.all(blogsToUpdate);

  //delete the users following the user
  const followersToUpdate: unknown[] = [];
  const userFollowers = await User.find({ following: { $in: [user._id] } });
  userFollowers.forEach((userFollower) => {
    const followList = userFollower.following.filter((followerId) => {
      return !followerId.equals(user._id);
    });
    userFollower.following = [...followList];
    followersToUpdate.push(userFollower.save());
  });
  await Promise.all(followersToUpdate);

  //delete the users followed by the user
  const followingsToUpdate: unknown[] = [];
  const userFollowings = await User.find({ followers: { $in: [user._id] } });
  userFollowings.forEach((userFollowing) => {
    const followList = userFollowing.followers.filter((followingId) => {
      return !followingId.equals(user._id);
    });
    userFollowing.followers = [...followList];
    followingsToUpdate.push(userFollowing.save());
  });
  await Promise.all(followingsToUpdate);

  const deletedUser = await user.deleteOne();

  return deletedUser;
};
