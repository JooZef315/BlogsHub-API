import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const logIn = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("wrong email or passowrd", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new CustomError("wrong email or passowrd", 401);
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.isAdmin ? "admin" : "user",
    },
    process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET",
    {
      expiresIn: "60m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET",
    {
      expiresIn: "1d",
    }
  );

  return { accessToken, refreshToken };
};
