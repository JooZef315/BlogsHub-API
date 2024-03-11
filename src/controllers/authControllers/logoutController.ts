import { Request, Response } from "express";

export const logoutController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.send("auth logout route");
};
