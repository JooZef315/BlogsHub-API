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

  const blogCoverUrl =
    blogData.blogCoverUrl ||
    "https://ucarecdn.com/049b854f-b0e6-4874-820f-c5ef2eb67693/blogCoverUrl.jpg";

  const slug = blogData.slug || "Blog description";

  const newBlog = await Blog.create({
    title: blogData.title,
    author: blogData.author,
    slug: slug,
    body: blogData.body,
    tags: blogData.tags,
    blogCoverUrl: blogCoverUrl,
  });

  return newBlog;
};
