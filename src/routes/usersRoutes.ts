import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  createUserController,
  deleteUserController,
  editUserController,
  followUserController,
  getUserController,
  getUsersController,
  toggleIsAdminController,
} from "../controllers";
import { verifyAdmin } from "../middlewares/authMiddlewares/verifyAdminMiddleware";
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";
import { verifyOwner } from "../middlewares/authMiddlewares/verifyOwnerMiddleware";
import { verifyOwnerOrAdmin } from "../middlewares/authMiddlewares/verifyOwnerOrAdminMiddleware";
import { initUpload } from "../config/multer";

const uploadImage = initUpload("users");

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(asyncHandler(verifyAdmin), asyncHandler(getUsersController))
  .post(uploadImage.single("image"), asyncHandler(createUserController));

usersRouter
  .route("/:id")
  .get(asyncHandler(verifyUser), asyncHandler(getUserController))
  .put(
    asyncHandler(verifyOwner),
    uploadImage.single("image"),
    asyncHandler(editUserController)
  )
  .delete(asyncHandler(verifyOwnerOrAdmin), asyncHandler(deleteUserController));

//follow / unfollow
usersRouter.post(
  "/:id/follow",
  asyncHandler(verifyUser),
  asyncHandler(followUserController)
);

//toggle isAdmin
usersRouter.put(
  "/:id/admin",
  asyncHandler(verifyAdmin),
  asyncHandler(toggleIsAdminController)
);
