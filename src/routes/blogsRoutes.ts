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
import { verifyOwner } from "../middlewares/authMiddlewares/verifyOwnerMiddleware";

export const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(asyncHandler(getBlogsController))
  .post(asyncHandler(createBlogController));

blogsRouter.get("/followed-blogs", asyncHandler(getFollowedBlogsController));

blogsRouter
  .route("/:bid")
  .get(asyncHandler(getBlogController))
  .put(asyncHandler(editBlogController))
  .delete(asyncHandler(deleteBlogController));

blogsRouter.post("/:bid/like", asyncHandler(likesController));

blogsRouter
  .route("/:bid/comments")
  .get(asyncHandler(getCommentsController))
  .post(asyncHandler(addCommentController));

blogsRouter
  .route("/:bid/comments/:cid")
  .get(asyncHandler(verifyOwner), asyncHandler(getCommentController))
  .put(asyncHandler(editCommentController))
  .delete(asyncHandler(deleteCommentController));
