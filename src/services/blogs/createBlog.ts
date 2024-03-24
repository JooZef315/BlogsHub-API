import mongoose from "mongoose";
import Blog from "../../models/blogModel";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";
import { TBlog } from "../../validators/zodTypes";

export const createBlog = async (blogData: TBlog) => {
  if (!mongoose.isValidObjectId(blogData.author)) {
    throw new CustomError("not a valid authorid", 400);
  }

  const existedBlog = await Blog.findOne({ title: blogData.title });
  if (existedBlog) {
    throw new CustomError("title must be unique", 400);
  }

  const author = await User.findById(blogData.author);
  if (!author) {
    throw new CustomError("author not found", 400);
  }

  const blogCoverUrl = blogData.blogCoverUrl
    ? blogData.blogCoverUrl
    : "assets/blogCoverUrl.jpg";

  const newBlog = await Blog.create({
    title: blogData.title,
    author: blogData.author,
    slug: blogData.slug,
    body: blogData.body,
    tags: blogData.tags,
    blogCoverUrl: blogCoverUrl,
  });

  return newBlog;
};
