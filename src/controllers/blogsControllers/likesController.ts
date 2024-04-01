import { Request, Response } from "express";
import { toggleLike } from "../../services/blogs/toggleLike";

// @desc    like/unlike a blog
// @route   POST /api/v1/blogs/:id/like
// @access  Private
// @param   {string} id - blog ID.
export const likesController = async (req: Request, res: Response) => {
  const blogId = req.params.bid;
  const currentUserId: string = req.body.currentUserId;

  await toggleLike(blogId, currentUserId);

  res.status(200).json({
    message: `user's likes list was updated successfully`,
  });
};
