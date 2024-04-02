import { Request, Response } from "express";
import { validateUser } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { editUser } from "../../services/users/editUser";

// @desc    updata a user
// @route   PUT /api/v1/users/:id
// @access  Private
// @param   {string} id - User ID.
export const editUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userData, error } = validateUser(req.body);

  if (error) {
    throw new CustomError(error.message, 400);
  }

  if (req.file?.destination && req.file?.filename) {
    const profilePic = `${req.file?.destination}/${req.file?.filename}`;
    userData.profilePicUrl = profilePic;
  }

  const updatedUser = await editUser(id, userData);

  res.status(200).json({
    message: `user ${updatedUser._id} was updated successfully`,
  });
};
