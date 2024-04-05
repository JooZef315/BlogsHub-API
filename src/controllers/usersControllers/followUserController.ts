import { Request, Response } from "express";
import { toggleFollow } from "../../services/users/toggleFollow";

// @desc    follow/unfollow a user
// @route   POST /api/v1/users/:id/follow
// @access  Private
// @param   {string} id - User ID.

type authenticatedRequest = Request & {
  userId: string;
  username: string;
  userRole: string;
};

export const followUserController = async (req: Request, res: Response) => {
  const paramId = req.params.id;
  const currentUserId: string = (req as authenticatedRequest).userId;

  await toggleFollow(paramId, currentUserId);

  res.status(200).json({
    message: `user's following list was updated successfully`,
  });
};
