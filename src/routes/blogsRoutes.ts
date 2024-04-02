import express from "express";
import asyncHandler from "express-async-handler";
import {
  getBlogsController,
  getBlogController,
  createBlogController,
  editBlogController,
  deleteBlogController,
  likesController,
  getFollowedBlogsController,
  getCommentController,
  getCommentsController,
  editCommentController,
  addCommentController,
  deleteCommentController,
} from "../controllers";
import { initUpload } from "../config/multer";

const uploadCover = initUpload("blogs");

export const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(asyncHandler(getBlogsController))
  .post(uploadCover.single("cover"), asyncHandler(createBlogController));

blogsRouter.get("/followed-blogs", asyncHandler(getFollowedBlogsController));

blogsRouter
  .route("/:bid")
  .get(asyncHandler(getBlogController))
  .put(uploadCover.single("cover"), asyncHandler(editBlogController))
  .delete(asyncHandler(deleteBlogController));

blogsRouter.post("/:bid/like", asyncHandler(likesController));

blogsRouter
  .route("/:bid/comments")
  .get(asyncHandler(getCommentsController))
  .post(asyncHandler(addCommentController));

blogsRouter
  .route("/:bid/comments/:cid")
  .get(asyncHandler(getCommentController))
  .put(asyncHandler(editCommentController))
  .delete(asyncHandler(deleteCommentController));
