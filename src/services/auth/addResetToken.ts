import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const addResetToken = async (
  email: string,
  token: string,
  tokenExpiredDate: Date
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("email not valid", 401);
  }

  const hashedToken = await bcrypt.hash(token, 10);

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = tokenExpiredDate;

  await user.save();
};
