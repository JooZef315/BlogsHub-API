import mongoose from "mongoose";
import { emailsValidator } from "../utils/emailsValidator";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "please add your username"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "please add your email"],
      validate: {
        validator: (email: string) => emailsValidator(email),
        message: "please enter a valid  email",
      },
    },
    password: {
      type: String,
      required: [true, "please add your password"],
      minlength: [4, "Password must be at least 4 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        unique: true,
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
