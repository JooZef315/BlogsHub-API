import { Request, Response } from "express";
import { CustomError } from "../../utils/customErrors";
import { validateComment } from "../../validators/commentValidator";
import { addComment } from "../../services/comments/addComment";

// @desc    create new comment
// @route   POST /api/v1/blogs/:bid/comments
// @access  Private
// @param   {string} bid - blog ID.
export const addCommentController = async (req: Request, res: Response) => {
  const { commentData, error } = validateComment(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  const newComment = await addComment(commentData);

  res.status(200).json(newComment);
};
