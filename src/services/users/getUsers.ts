import User from "../../models/userModel";

export const getUsers = async () => {
  const users = await User.find().select([
    "username",
    "email",
    "isAdmin",
    "likes",
    "followers",
    "following",
  ]);
  return users;
};
