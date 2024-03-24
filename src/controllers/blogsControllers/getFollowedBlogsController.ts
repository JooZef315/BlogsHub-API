import { Request, Response } from "express";
import { getFollowedBlogs } from "../../services/blogs/getFollowedBlogs";

// @desc    get blogs from users you follow
// @route   GET /api/v1/blogs/followed-blogs
// @access  Private
// @query   {number} page - Optional. for pagination.

const BLOGS_PER_PAGE = 2;

export const getFollowedBlogsController = async (
  req: Request<{}, {}, { currentUser: string }, { page: number }>,
  res: Response
) => {
  const page = +req.query.page || 1;
  const currentUser = req.body.currentUser;

  const followedBlogs = await getFollowedBlogs(
    currentUser,
    page,
    BLOGS_PER_PAGE
  );

  res.status(200).json(followedBlogs);
};
