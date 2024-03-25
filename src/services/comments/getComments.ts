import mongoose from "mongoose";
import Comment from "../../models/commentModel";
import Blog from "../../models/blogModel";
import { CustomError } from "../../utils/customErrors";
import { nestComments } from "./helpers/nestComments";
import { Comments } from "./helpers/commentTypes";

export const getComments = async (blogId: string, nested: boolean) => {
  if (!mongoose.isValidObjectId(blogId)) {
    throw new CustomError("not a valid Id", 400);
  }
  const isBlogExisted = await Blog.countDocuments({ _id: blogId });
  if (!isBlogExisted) {
    throw new CustomError("blog not found", 400);
  }

  const comments: Comments = await Comment.find({ blogId })
    .sort({ createdAt: 1 })
    .select("body replies createdAt updatedAt ~blogId")
    .populate([
      {
        path: "userId",
        select: "username profilePicUrl",
      },
      {
        path: "parentId",
        select: "body",
      },
    ]);

  if (!nested) {
    return comments;
  } else {
    const nestedComments = nestComments(comments);
    return nestedComments;
  }
};
