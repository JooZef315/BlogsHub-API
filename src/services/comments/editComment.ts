import mongoose from "mongoose";
import Comment from "../../models/commentModel";
import { CustomError } from "../../utils/customErrors";

export const editComment = async (id: string, newCommentBody: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  const oldComment = await Comment.findById(id);
  if (!oldComment) {
    throw new CustomError("comment not found", 400);
  }

  oldComment.body = newCommentBody?.trim() || oldComment.body;

  const updatedComment = await oldComment.save();

  return updatedComment;
};
