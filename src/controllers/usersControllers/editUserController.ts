import { Request, Response } from "express";

export const editUserController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("edit User route");
};
