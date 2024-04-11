import { Request, Response } from "express";
import { validateBlog } from "../../validators/blogValidator";
import { CustomError } from "../../utils/customErrors";
import { editBlog } from "../../services/blogs/editBlog";
import { uploadCareClient } from "../../utils/uploadCareClient";

// @desc    Update a blog
// @route   PUT /api/v1/blogs/:bid
// @access  Private
// @param   {string} bid - blog ID.
export const editBlogController = async (req: Request, res: Response) => {
  const id = req.params.bid;
  const { blogData, error } = validateBlog(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file) {
    const coverPic = (await uploadCareClient(req.file.path)) || undefined;
    blogData.blogCoverUrl = coverPic;
  }

  const updatedBlog = await editBlog(id, blogData);

  res.status(200).json({
    message: `blog ${updatedBlog._id} was updated successfully`,
  });
};
