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

export const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(asyncHandler(getBlogsController))
  .post(asyncHandler(createBlogController));

blogsRouter.get("/followed-blogs", asyncHandler(getFollowedBlogsController));

blogsRouter
  .route("/:id")
  .get(asyncHandler(getBlogController))
  .put(asyncHandler(editBlogController))
  .delete(asyncHandler(deleteBlogController));

blogsRouter.post("/:id/like", asyncHandler(likesController));

blogsRouter
  .route("/:bid/comments")
  .get(asyncHandler(getCommentsController))
  .post(asyncHandler(addCommentController));

blogsRouter
  .route("/:bid/comments/:cid")
  .get(asyncHandler(getCommentController))
  .put(asyncHandler(editCommentController))
  .delete(asyncHandler(deleteCommentController));
