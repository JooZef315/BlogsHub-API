import { Request, Response } from "express";
import { getBlogs } from "../../services/blogs/getBlogs";

// @desc    get all blogs
// @route   GET /api/v1/blogs
// @access  Public
// @query   {string} authorid - Optional. to filter by the user.
// @query   {boolean} tag - Optional. to filter by tags.
// @query   {number} page - Optional. for pagination.

type MyQueryParams = {
  page: number;
  authorid: string;
  tag: string;
};

const BLOGS_PER_PAGE = 2;

export const getBlogsController = async (
  req: Request<{}, {}, {}, MyQueryParams>,
  res: Response
) => {
  const page = +req.query.page || 1;
  const authorid = req.query.authorid;
  const tag = req.query.tag;

  const data = await getBlogs(authorid, tag, page, BLOGS_PER_PAGE);

  res.status(200).json(data);
};
