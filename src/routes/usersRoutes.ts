import express from "express";
import asyncHandler from "express-async-handler";
import {
  createUserController,
  deleteUserController,
  editUserController,
  followUserController,
  getUserController,
  getUsersController,
} from "../controllers";

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(asyncHandler(getUsersController))
  .post(asyncHandler(createUserController));

//query to include followers / likes / blogs
usersRouter
  .route("/:id")
  .get(asyncHandler(getUserController))
  .put(asyncHandler(editUserController))
  .delete(asyncHandler(deleteUserController));

//follow / unfollow
usersRouter.put("/:id/follow", asyncHandler(followUserController));
