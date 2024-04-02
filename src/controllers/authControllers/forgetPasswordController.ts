import { Request, Response } from "express";
import { emailsValidator } from "../../utils/emailsValidator";
import { CustomError } from "../../utils/customErrors";
import { generateToken } from "../../utils/generateToken";
import { emailInit } from "../../config/email";
import { addResetToken } from "../../services/auth/addResetToken";

// @desc    to send an email to reset password
// @route   GET /api/v1/auth/forget-password
// @access  Public
// @param   {string} email - User email.

type MyQueryParams = {
  email: string;
};

export const forgetPasswordController = async (
  req: Request<{}, {}, {}, MyQueryParams>,
  res: Response
) => {
  const email = req.query.email?.toLowerCase().trim();
  if (!emailsValidator(email) || email.length < 1) {
    throw new CustomError("email is not valid", 400);
  }

  const resetPasswordToken = generateToken();
  const tokenExpiredDate = new Date();
  tokenExpiredDate.setMinutes(tokenExpiredDate.getMinutes() + 30);

  await addResetToken(email, resetPasswordToken, tokenExpiredDate);

  console.log("sending email ... ");
  const { transporter, options } = emailInit(email, resetPasswordToken);
  await transporter.sendMail(options);
  console.log("email sent!!");

  res.status(200).json({
    message: "a token was sent to your email, please check your email",
  });
};
