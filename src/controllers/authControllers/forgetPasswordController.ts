import { Request, Response } from "express";

export const forgetPasswordController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.send("auth get forget-password route");
};
