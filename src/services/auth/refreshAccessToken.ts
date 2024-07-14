import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";

type RefreshPyload = JwtPayload & {
  id: string;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

  if (!refreshToken) {
    throw new CustomError("invalid token", 401);
  }
  try {
    const payload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
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
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return accessToken;
  } catch (error: any) {
    console.log(error.message);
    throw new CustomError(error.message, 401);
  }
};
