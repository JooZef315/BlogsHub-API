import { Request, Response } from "express";
import { toggleLike } from "../../services/blogs/toggleLike";

// @desc    like/unlike a blog
// @route   POST /api/v1/blogs/:bid/like
// @access  Private
// @param   {string} bid - blog ID.

type authenticatedRequest = Request & {
  userId: string;
  username: string;
  userRole: string;
};

export const likesController = async (req: Request, res: Response) => {
  const blogId = req.params.bid;
  const currentUserId: string = (req as authenticatedRequest).userId;

  await toggleLike(blogId, currentUserId);

  res.status(200).json({
    message: `user's likes list was updated successfully`,
  });
};
