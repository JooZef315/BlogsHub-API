import { Request, Response } from "express";
import { getComments } from "../../services/comments/getComments";

// @desc    get all comments for a blog
// @route   GET /api/v1/blogs/:bid/comments
// @access  Private
// @param   {string} bid - blog ID.
// @query   {boolean} nested - Optional. to get the comments nested.
export const getCommentsController = async (req: Request, res: Response) => {
  const blogId = req.params.bid;
  const nested = req.query.nested === "true" || false;
  const comments = await getComments(blogId, nested);

  res.status(200).json(comments);
};
