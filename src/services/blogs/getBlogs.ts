import mongoose from "mongoose";
import Blog from "../../models/blogModel";
import { CustomError } from "../../utils/customErrors";

export const getBlogs = async (
  authorid: string,
  tag: string,
  page: number,
  blogsPerPage: number
) => {
  if (authorid && !mongoose.isValidObjectId(authorid)) {
    throw new CustomError("not a valid Id", 400);
  }

  const totalBlogsCount = await Blog.countDocuments();
  const totalPagesCount = Math.ceil(totalBlogsCount / blogsPerPage);

  if (page > totalPagesCount && totalPagesCount > 0) {
    throw new CustomError(
      `only pages between 1 and ${totalPagesCount} allowed`,
      400
    );
  }

  let query = Blog.find();

  if (authorid) {
    query = query.where("author").equals(authorid);
  }
  if (tag) {
    query = query.where("tags").in([tag.toLowerCase()]);
  }

  query = query
    .populate({
      path: "author",
      select: "username profilePicUrl",
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * blogsPerPage)
    .limit(blogsPerPage);

  const blogs = await query.exec();

  const data = blogs.map((blog) => {
    const commentsCount = blog.comments.length;
    const likesCount = blog.likedBy.length;
    return {
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      slug: blog.slug,
      body: blog.body,
      commentsCount: commentsCount,
      likesCount: likesCount,
      blogCoverUrl: blog.blogCoverUrl,
      tags: blog.tags,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  });

  return { data, page, totalBlogsCount, totalPagesCount };
};
