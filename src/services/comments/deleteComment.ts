import mongoose from "mongoose";
import { CustomError } from "../../utils/customErrors";
import Comment from "../../models/commentModel";
import Blog from "../../models/blogModel";
import { getNestedRepliesIds } from "./helpers/nesting";
import { Comment as TComment } from "./helpers/commentTypes";
import { getRepliesIds } from "../../utils/flattenArray";

export const deleteComment = async (bid: string, cid: string) => {
  if (!mongoose.isValidObjectId(bid) || !mongoose.isValidObjectId(cid)) {
    throw new CustomError("not a valid Id", 400);
  }

  const blog = await Blog.findById(bid);
  if (!blog) {
    throw new CustomError("blog not found", 400);
  }

  const comment: TComment | null = await Comment.findById(cid);
  if (!comment) {
    throw new CustomError("comment not found", 400);
  }

  const blogComments: TComment[] = await Comment.find({ blogId: blog._id });

  const ids = getNestedRepliesIds(comment, blogComments);
  const flattenIds = getRepliesIds(ids);

  //edit blog's comments
  const commentsToDelete = [...flattenIds, comment._id].map((c) =>
    c.toString()
  );
  const newComments = blog.comments.filter(
    (commentId) => !commentsToDelete.includes(commentId.toString())
  );
  blog.comments = [...newComments];
  await blog.save();

  //edit replies of the parent comment
  const parentComment = await Comment.findById(comment.parentId);

  if (parentComment) {
    const newReplies = parentComment.replies.filter(
      (reply) => !reply.equals(comment._id)
    );
    parentComment.replies = [...newReplies];
    await parentComment.save();
  }

  //delete comments in ids
  await Comment.deleteMany({ _id: { $in: flattenIds } });

  //delete main comment
  const deletedComment = await Comment.deleteOne({ _id: comment._id });

  return deletedComment;
};
