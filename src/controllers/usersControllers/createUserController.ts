import { Request, Response } from "express";

export const createUserController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("add User route");
};
