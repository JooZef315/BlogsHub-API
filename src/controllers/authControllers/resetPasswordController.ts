import { Request, Response } from "express";

export const resetPasswordController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.send("auth post reset Password route");
};
