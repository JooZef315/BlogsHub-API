import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

export const logIn = async (email: string, password: string) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

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
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
