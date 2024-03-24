import mongoose, { Document } from "mongoose";
import Blog from "../../models/blogModel";
import Comment from "../../models/commentModel";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const deleteBlog = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid Id", 400);
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new CustomError("blog not found", 404);
  }

  //delete blog's comments
  await Comment.deleteMany({ blogId: blog._id });

  //delete likes
  const usersToUpdate: unknown[] = [];
  const usersLikes = await User.find({ likes: { $in: [blog._id] } });
  usersLikes?.forEach((userLike) => {
    const likesList = userLike.likes.filter((like) => {
      return !like.equals(blog._id);
    });
    userLike.likes = [...likesList];
    usersToUpdate.push(userLike.save());
  });
  await Promise.all(usersToUpdate);

  //delete blog
  const deletedBlog = await blog.deleteOne();

  return deletedBlog;
};
