import mongoose from "mongoose";

export type Comment = {
  _id: mongoose.Types.ObjectId;
  body: string;
  userId: {
    _id: mongoose.Types.ObjectId;
    username: string;
    profilePicUrl: string;
  };
  parentId: {
    _id: mongoose.Types.ObjectId;
    body: string;
  } | null;
  replies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type Comments = Comment[] | [];

export type NestedComment = {
  _id: mongoose.Types.ObjectId;
  body: string;
  userId: {
    _id: mongoose.Types.ObjectId;
    username: string;
    profilePicUrl: string;
  };
  parentId: {
    _id: mongoose.Types.ObjectId;
    body: string;
  } | null;
  replies: nestedComment[];
  createdAt: Date;
  updatedAt: Date;
};

export type NestedComments = NestedComment[] | [];
