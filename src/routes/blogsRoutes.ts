import express from "express";
import asyncHandler from "express-async-handler";
import {
  getBlogsController,
  getBlogController,
  addBlogController,
  editBlogController,
  deleteBlogController,
  addLikeController,
  getFollowedBlogsController,
  getCommentController,
  getCommentsController,
  addCommentController,
  deleteCommentController,
} from "../controllers";

export const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(asyncHandler(getBlogsController))
  .post(asyncHandler(addBlogController));

blogsRouter.get("/followed-blogs", asyncHandler(getFollowedBlogsController));

blogsRouter
  .route("/:id")
  .get(asyncHandler(getBlogController))
  .put(asyncHandler(editBlogController))
  .delete(asyncHandler(deleteBlogController));

blogsRouter.post("/:id/like", asyncHandler(addLikeController));

blogsRouter
  .route("/:id/comments")
  .get(asyncHandler(getCommentsController))
  .post(asyncHandler(addCommentController));

blogsRouter
  .route("/:id/comments/:id")
  .get(asyncHandler(getCommentController))
  .put(asyncHandler(editBlogController))
  .delete(asyncHandler(deleteCommentController));
