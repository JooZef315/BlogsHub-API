import bcrypt from "bcryptjs";
import User from "../../models/userModel";
import { CustomError } from "../../utils/customErrors";
import { TUser } from "../../validators/zodTypes";

export const createUser = async (userData: TUser) => {
  const existedUser = await User.findOne({
    $or: [{ username: userData.username }, { email: userData.email }],
  });

  if (existedUser) {
    throw new CustomError("user already exists!", 400);
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const profilePicUrl = userData.profilePicUrl
    ? userData.profilePicUrl
    : "https://ucarecdn.com/bab9f262-fd8b-44b4-b3ef-32781584d69e/profilePic.png";

  const newUser = await User.create({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    isAdmin: false,
    profilePicUrl: profilePicUrl,
  });

  return newUser;
};
