import mongoose from "mongoose";
import Comment from "../../models/commentModel";
import Blog from "../../models/blogModel";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";
import { TComment } from "../../validators/zodTypes";

export const addComment = async (bid: string, commentData: TComment) => {
  if (
    !mongoose.isValidObjectId(commentData.userId) ||
    !mongoose.isValidObjectId(commentData.blogId) ||
    !mongoose.isValidObjectId(bid)
  ) {
    throw new CustomError("not a valid id/ids", 400);
  }

  if (bid != commentData.blogId) {
    throw new CustomError("wrong blog id", 400);
  }

  const blog = await Blog.findById(commentData.blogId);
  if (!blog) {
    throw new CustomError("blog not found", 400);
  }

  const user = await User.findById(commentData.userId);
  if (!user) {
    throw new CustomError("user not found", 400);
  }

  const parentId = commentData.parentId || null;

  if (parentId && !mongoose.isValidObjectId(parentId)) {
    throw new CustomError("not a valid id", 400);
  }

  const parentComment = await Comment.findById(parentId);

  if (parentId && !parentComment) {
    throw new CustomError("parent Comment not found", 400);
  }

  const newComment = await Comment.create({
    blogId: commentData.blogId,
    userId: commentData.userId,
    body: commentData.body,
    parentId: parentId,
  });

  //add to the blog comments
  blog?.comments.push(newComment._id);
  await blog?.save();

  //add to the parent repiles
  parentComment?.replies.push(newComment._id);
  await parentComment?.save();

  return newComment;
};
