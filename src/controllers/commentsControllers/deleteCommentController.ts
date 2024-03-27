import { Request, Response } from "express";
import { deleteComment } from "../../services/comments/deleteComment";

// @desc    delete a comment
// @route   DELETE /api/v1/blogs/:bid/comments/:cid
// @access  Private
// @param   {string} cid - comment ID.
// @param   {string} bid - blog ID.
export const deleteCommentController = async (req: Request, res: Response) => {
  const cid = req.params.cid;
  const bid = req.params.bid;

  const deletedComment = await deleteComment(bid, cid);

  res.status(200).json({
    message: `${deletedComment.deletedCount} comment and its replies were deleted successfully`,
  });
};
