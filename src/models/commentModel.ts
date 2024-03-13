import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, "please add your comment"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentSchema);
