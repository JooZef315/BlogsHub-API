import { Request, Response } from "express";
import { editComment } from "../../services/comments/editComment";

// @desc    updata a comment
// @route   PUT /api/v1/blogs/:bid/comments/:cid
// @access  Private
// @param   {string} bid - blog ID.
// @param   {string} cid - comment ID.
export const editCommentController = async (req: Request, res: Response) => {
  const id = req.params.cid;
  const newCommentBody: string = req.body.body;

  const updatedComment = await editComment(id, newCommentBody);

  res.status(200).json({
    message: `comment ${updatedComment._id} was updated successfully`,
  });
};
