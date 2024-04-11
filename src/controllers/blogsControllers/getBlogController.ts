import { Request, Response } from "express";
import { getBlog } from "../../services/blogs/getBlog";

// @desc    get a blog
// @route   GET /api/v1/blogs/:bid
// @access  Public
// @param   {string} bid - Blog ID.
export const getBlogController = async (req: Request, res: Response) => {
  const bid = req.params.bid;
  const blog = await getBlog(bid);

  res.status(200).json(blog);
};
