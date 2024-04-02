import { Request, Response } from "express";
import { CustomError } from "../../utils/customErrors";
import { resetPassword } from "../../services/auth/resetPassword";
import { validateresetingPassword } from "../../validators/resetingPasswordValidator";

// @desc    to reset password
// @route   PUT /api/v1/auth/reset-password
// @access  Public
export const resetPasswordController = async (req: Request, res: Response) => {
  const { resetingPasswordData, error } = validateresetingPassword(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  await resetPassword(resetingPasswordData);

  res.status(200).json({
    message: "ypur password was reset successfully, please login",
  });
};
