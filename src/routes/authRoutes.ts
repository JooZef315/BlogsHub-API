import express from "express";
import asyncHandler from "express-async-handler";
import {
  loginController,
  refreshController,
  logoutController,
  resetPasswordController,
  forgetPasswordController,
} from "../controllers";

export const authRouter = express.Router();

authRouter.post("/login", asyncHandler(loginController));

authRouter.get("/refresh", asyncHandler(refreshController));

authRouter.get("forget-password", asyncHandler(forgetPasswordController));
authRouter.put("/reset-password", asyncHandler(resetPasswordController));

authRouter.post("/logout", asyncHandler(logoutController));
