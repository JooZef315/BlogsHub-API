import mongoose from "mongoose";
// import Comment from "./commentModel";
// import User from "./userModel";

const blogSchema = new mongoose.Schema(
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
    },
    body: {
      type: String,
      required: [true, "please add your blog body"],
      minlength: [5, "blogs must be at least 50 characters long"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        unique: true,
      },
    ],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    blogCoverUrl: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
