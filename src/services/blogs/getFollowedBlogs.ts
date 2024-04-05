import mongoose from "mongoose";
import { CustomError } from "../../utils/customErrors";
import Blog from "../../models/blogModel";
import User from "../../models/userModel";

export const getFollowedBlogs = async (
  currentUserId: string,
  page: number,
  blogsPerPage: number
) => {
  if (!mongoose.isValidObjectId(currentUserId)) {
    throw new CustomError("not a valid Id", 400);
  }

  const user = await User.findById(currentUserId);

  if (!user) {
    throw new CustomError("user not found", 400);
  }

  const totalBlogsCount = await Blog.countDocuments({
    author: { $in: user.following },
  });
  const totalPagesCount = Math.ceil(totalBlogsCount / blogsPerPage);

  if (page > totalPagesCount && totalPagesCount > 0) {
    throw new CustomError(
      `only pages between 1 and ${totalPagesCount} allowed`,
      400
    );
  }

  const followedBlogs = await Blog.find({
    author: { $in: user.following },
  })
    .populate({
      path: "author",
      select: "username profilePicUrl",
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * blogsPerPage)
    .limit(blogsPerPage);

  const data = followedBlogs.map((blog) => {
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
