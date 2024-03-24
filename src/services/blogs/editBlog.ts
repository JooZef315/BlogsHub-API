import mongoose from "mongoose";
import Blog from "../../models/blogModel";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";
import { TBlog } from "../../validators/zodTypes";

export const editBlog = async (id: string, blogData: TBlog) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  if (!mongoose.isValidObjectId(blogData.author)) {
    throw new CustomError("not a valid authorid", 400);
  }

  const author = await User.findById(blogData.author);
  if (!author) {
    throw new CustomError("author not found", 400);
  }

  const blogWithSameTitle = await Blog.findOne({
    $and: [{ title: blogData.title }, { _id: { $ne: id } }],
  });
  if (blogWithSameTitle) {
    throw new CustomError("title already taken", 400);
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new CustomError("blog not found", 404);
  }

  blog.title = blogData.title;
  blog.author = new mongoose.Types.ObjectId(blogData.author);
  blog.slug = blogData.slug || "Blog description";
  blog.body = blogData.body;
  blog.tags = blogData.tags;
  blog.blogCoverUrl = blogData.blogCoverUrl || blog.blogCoverUrl;

  const updatedBlog = await blog.save();

  return updatedBlog;
};
