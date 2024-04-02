import express from "express";
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
import { initUpload } from "../config/multer";

const uploadImage = initUpload("users");

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(asyncHandler(getUsersController))
  .post(uploadImage.single("image"), asyncHandler(createUserController));

usersRouter
  .route("/:id")
  .get(asyncHandler(getUserController))
  .put(uploadImage.single("image"), asyncHandler(editUserController))
  .delete(asyncHandler(deleteUserController));

//follow / unfollow
usersRouter.post("/:id/follow", asyncHandler(followUserController));

//toggle isAdmin
usersRouter.put("/:id/admin", asyncHandler(toggleIsAdminController));
