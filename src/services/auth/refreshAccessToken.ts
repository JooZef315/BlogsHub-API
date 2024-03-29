import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

type RefreshPyload = JwtPayload & {
  id: string;
};

export const refreshAccessToken = async (refreshToken: string) => {
  console.log(refreshToken);
  if (!refreshToken) {
    throw new CustomError("invalid token", 401);
  }
  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET"
    ) as RefreshPyload;

    const user = await User.findById(payload.id);

    if (!user) {
      throw new CustomError("Unauthorized user", 401);
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

    return accessToken;
  } catch (error: any) {
    console.log(error.message);
    throw new CustomError(error.message, 401);
  }
};
