import { Request, Response } from "express";
import { CustomError } from "../../utils/customErrors";
import { createBlog } from "../../services/blogs/createBlog";
import { validateBlog } from "../../validators/blogValidator";
import { uploadCareClient } from "../../utils/uploadCareClient";

// @desc    create new blog
// @route   POST /api/v1/blogs/
// @access  Private
export const createBlogController = async (req: Request, res: Response) => {
  const { blogData, error } = validateBlog(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file) {
    const coverPic = (await uploadCareClient(req.file.path)) || undefined;
    blogData.blogCoverUrl = coverPic;
  }

  const newBlog = await createBlog(blogData);

  res.status(200).json(newBlog);
};
