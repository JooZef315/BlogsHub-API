import mongoose from "mongoose";
import Blog from "../../models/blogModel";
import { CustomError } from "../../utils/customErrors";

type CommentsToReturn = {
  _id: string;
  body: string;
  userId: string;
  replies: string[];
  repliesCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export const getBlog = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("not a valid id", 400);
  }

  const blog = await Blog.findById(id).populate([
    {
      path: "author",
      select: "username profilePicUrl",
    },
    {
      path: "likedBy",
      select: "username profilePicUrl",
    },
    {
      path: "comments",
      match: { parentId: null }, //only direct comments
      options: { sort: { createdAt: -1 }, limit: 3 }, //get mosst recent 3 comments
      select: "userId body replies createdAt updatedAt",
      populate: {
        path: "userId",
        select: "username profilePicUrl",
      },
    },
  ]);

  const commentsData = blog?.comments.map((comment) => {
    const commentToReturn = comment as unknown as CommentsToReturn;
    const repliesCount = commentToReturn.replies.length;
    return {
      _id: commentToReturn._id,
      body: commentToReturn.body,
      userId: commentToReturn.userId,
      repliesCount,
      createdAt: commentToReturn.createdAt,
      updatedAt: commentToReturn.updatedAt,
    };
  });

  return { ...blog?.toObject(), comments: commentsData };
};
