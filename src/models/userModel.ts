import mongoose from "mongoose";
import { emailsValidator } from "../utils/emailsValidator";

export const userSchema = new mongoose.Schema(
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
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicUrl: {
      type: String,
      default:
        "https://ucarecdn.com/bab9f262-fd8b-44b4-b3ef-32781584d69e/profilePic.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
