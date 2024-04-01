import { Request, Response } from "express";
import { getBlog } from "../../services/blogs/getBlog";

// @desc    get a blog
// @route   GET /api/v1/blogs/:id
// @access  Public
// @param   {string} id - Blog ID.
export const getBlogController = async (req: Request, res: Response) => {
  const id = req.params.bid;
  const blog = await getBlog(id);

  res.status(200).json(blog);
};
