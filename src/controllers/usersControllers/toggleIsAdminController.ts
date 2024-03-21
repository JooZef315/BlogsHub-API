import { Request, Response } from "express";
import { toggleAdminRole } from "../../services/users/toggleAdminRole";

/* 
TODO: add auth
*/

// @desc    change user/ admin roles
// @route   PUT /api/v1/users/:id/admin
// @access  Private (admins)
// @param   {string} id - User ID.
export const toggleIsAdminController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  await toggleAdminRole(userId);

  res.status(200).json({
    message: `user's admin role was updated successfully`,
  });
};
