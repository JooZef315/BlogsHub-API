import { Request, Response } from "express";
import { getFollowedBlogs } from "../../services/blogs/getFollowedBlogs";

// @desc    get blogs from users you follow
// @route   GET /api/v1/blogs/followed-blogs
// @access  Private
// @query   {number} page - Optional. for pagination.

type authenticatedRequest = Request & {
  userId: string;
  username: string;
  userRole: string;
};

const BLOGS_PER_PAGE = 6;

export const getFollowedBlogsController = async (
  req: Request,
  res: Response
) => {
  const page = req.query.page ? +req.query.page : 1;
  const currentUserId: string = (req as authenticatedRequest).userId;

  const followedBlogs = await getFollowedBlogs(
    currentUserId,
    page,
    BLOGS_PER_PAGE
  );

  res.status(200).json(followedBlogs);
};
