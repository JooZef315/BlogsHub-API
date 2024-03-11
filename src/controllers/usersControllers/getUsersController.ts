import { Request, Response } from "express";

export const getUsersController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("get Users route");
};
