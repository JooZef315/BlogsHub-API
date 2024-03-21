import { Request, Response } from "express";
import { validateUser } from "../../validators/userValidator";
import { CustomError } from "../../utils/customErrors";
import { editUser } from "../../services/users/editUser";

/* 
TODO: upload profilePic
*/

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

  const updatedUser = await editUser(id, userData);

  res.status(200).json({
    message: `user ${updatedUser._id} was updated successfully`,
  });
};
