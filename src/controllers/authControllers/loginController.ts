import { Request, Response } from "express";

export const loginController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.send("auth login route");
};
