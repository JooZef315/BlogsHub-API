import mongoose from "mongoose";
import { string } from "zod";

export const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please add your blog title"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      maxlength: [50, "slug must be at most 50 characters long"],
      default: "Blog description",
    },
    body: {
      type: String,
      required: [true, "please add your blog body"],
      minlength: [10, "blogs must be at least 50 characters long"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blogCoverUrl: {
      type: String,
      default:
        "https://ucarecdn.com/049b854f-b0e6-4874-820f-c5ef2eb67693/blogCoverUrl.jpg",
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
