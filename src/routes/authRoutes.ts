import express from "express";
import asyncHandler from "express-async-handler";
import {
  loginController,
  refreshController,
  logoutController,
  resetPasswordController,
  forgetPasswordController,
} from "../controllers";
import { verifyUser } from "../middlewares/authMiddlewares/verifyUserMiddleware";
import { limiter } from "../middlewares/rateLimiter";

export const authRouter = express.Router();

authRouter.post("/login", asyncHandler(loginController));

authRouter.get(
  "/refresh",
  asyncHandler(verifyUser),
  asyncHandler(refreshController)
);

authRouter.get(
  "/forget-password",
  limiter,
  asyncHandler(forgetPasswordController)
);
authRouter.put(
  "/reset-password",
  limiter,
  asyncHandler(resetPasswordController)
);

authRouter.post(
  "/logout",
  asyncHandler(verifyUser),
  asyncHandler(logoutController)
);
