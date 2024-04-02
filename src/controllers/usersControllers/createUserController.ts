import { Request, Response } from "express";
import { validateUser } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { createUser } from "../../services/users/createUser";

// @desc    signup
// @route   POST /api/v1/users/
// @access  Public
export const createUserController = async (req: Request, res: Response) => {
  const { userData, error } = validateUser(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file?.destination && req.file?.filename) {
    const profilePic = `${req.file?.destination}/${req.file?.filename}`;
    userData.profilePicUrl = profilePic;
  }

  const newUser = await createUser(userData);

  res.status(200).json({
    message: `new user ${newUser.username} was created successfully, please login`,
  });
};
