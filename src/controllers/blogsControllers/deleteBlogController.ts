import { Request, Response } from "express";
import { deleteBlog } from "../../services/blogs/deleteBlog";

// @desc    delete a blog
// @route   DELETE /api/v1/blogs/:id
// @access  Private
// @param   {string} id - blog ID.
export const deleteBlogController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteddBlog = await deleteBlog(id);

  res.status(200).json({
    message: `${deleteddBlog.deletedCount} blog was deleted successfully`,
  });
};
