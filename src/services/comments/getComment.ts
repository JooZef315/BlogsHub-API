import mongoose from "mongoose";
import { CustomError } from "../../utils/customErrors";
import Comment from "../../models/commentModel";
import Blog from "../../models/blogModel";
import { nestReplies } from "./helpers/nesting";
import { NestedComment, Comment as TComment } from "./helpers/commentTypes";

export const getComment = async (bid: string, cid: string) => {
  if (!mongoose.isValidObjectId(bid) || !mongoose.isValidObjectId(cid)) {
    throw new CustomError("not a valid Id", 400);
  }

  const blog = await Blog.findById(bid);
  if (!blog) {
    throw new CustomError("blog not found", 400);
  }

  const comment: TComment | null = await Comment.findById(cid)
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

  if (!comment) {
    throw new CustomError("comment not found", 400);
  }

  const blogComments: TComment[] = await Comment.find({
    blogId: blog._id,
  })
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

  const nestedreplies = nestReplies(comment, blogComments);

  const fullComment: NestedComment = {
    _id: comment._id,
    userId: comment.userId,
    body: comment.body,
    parentId: comment.parentId,
    replies: nestedreplies,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };

  return fullComment;
};
