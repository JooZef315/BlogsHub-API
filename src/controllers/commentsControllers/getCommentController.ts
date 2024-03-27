import { Request, Response } from "express";
import { getComment } from "../../services/comments/getComment";

// @desc    get a comment
// @route   GET /api/v1/blogs/:bid/comments/:cid
// @access  Private
// @param   {string} cid - comment ID.
// @param   {string} bid - blog ID.
export const getCommentController = async (req: Request, res: Response) => {
  const cid = req.params.cid;
  const bid = req.params.bid;

  const comment = await getComment(bid, cid);

  res.status(200).json(comment);
};
