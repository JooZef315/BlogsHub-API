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
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";
import { verifyOwner } from "../middlewares/authMiddlewares/verifyOwnerMiddleware";
import { verifyOwnerOrAdmin } from "../middlewares/authMiddlewares/verifyOwnerOrAdminMiddleware";
import { initUpload } from "../config/multer";

const uploadCover = initUpload("blogs");

export const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(asyncHandler(getBlogsController))
  .post(
    asyncHandler(verifyUser),
    uploadCover.single("cover"),
    asyncHandler(createBlogController)
  );

blogsRouter.get(
  "/followed-blogs",
  asyncHandler(verifyUser),
  asyncHandler(getFollowedBlogsController)
);

blogsRouter
  .route("/:bid")
  .get(asyncHandler(getBlogController))
  .put(
    asyncHandler(verifyOwner),
    uploadCover.single("cover"),
    asyncHandler(editBlogController)
  )
  .delete(asyncHandler(verifyOwnerOrAdmin), asyncHandler(deleteBlogController));

blogsRouter.post(
  "/:bid/like",
  asyncHandler(verifyUser),
  asyncHandler(likesController)
);

blogsRouter
  .route("/:bid/comments")
  .get(asyncHandler(verifyUser), asyncHandler(getCommentsController))
  .post(asyncHandler(verifyUser), asyncHandler(addCommentController));

blogsRouter
  .route("/:bid/comments/:cid")
  .get(asyncHandler(verifyUser), asyncHandler(getCommentController))
  .put(asyncHandler(verifyOwner), asyncHandler(editCommentController))
  .delete(
    asyncHandler(verifyOwnerOrAdmin),
    asyncHandler(deleteCommentController)
  );
