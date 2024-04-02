import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import { TResetingPassword } from "../../validators/zodTypes";
import { CustomError } from "../../utils/customErrors";

export const resetPassword = async (resetingData: TResetingPassword) => {
  const user = await User.findOne({ email: resetingData.email });

  if (!user) {
    throw new CustomError("email not valid", 401);
  }

  if (!user.passwordResetExpires || !user.passwordResetToken) {
    throw new CustomError("Forbidden", 403);
  }

  if (user.passwordResetExpires < new Date()) {
    throw new CustomError("token expired", 401);
  }

  const tokenMatches = await bcrypt.compare(
    resetingData.token,
    user.passwordResetToken
  );

  if (!tokenMatches) {
    throw new CustomError("invalid token", 401);
  }

  const newHashedPassword = await bcrypt.hash(resetingData.newPassword, 10);

  user.password = newHashedPassword;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();
};
