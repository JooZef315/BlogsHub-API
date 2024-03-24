import mongoose from "mongoose";
import Blog from "../../models/blogModel";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const toggleLike = async (blogId: string, currentUserId: string) => {
  if (
    !mongoose.isValidObjectId(blogId) ||
    !mongoose.isValidObjectId(currentUserId)
  ) {
    throw new CustomError("not a valid Id", 400);
  }

  const user = await User.findById(currentUserId);
  if (!user) {
    throw new CustomError("user not found", 400);
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new CustomError("blog not found", 400);
  }

  const isUserLikes = user.likes.includes(blog._id);

  if (isUserLikes) {
    const userLikes = user.likes.filter((like) => !like.equals(blog._id));
    user.likes = [...userLikes];
    await user.save();

    const blogLikedBy = blog.likedBy.filter((like) => !like.equals(user._id));
    blog.likedBy = [...blogLikedBy];
    await blog.save();
  } else {
    user.likes.push(blog._id);
    await user.save();

    blog.likedBy.push(user._id);
    await blog.save();
  }
};
