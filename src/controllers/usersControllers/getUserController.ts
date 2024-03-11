import { Request, Response } from "express";

export const getUserController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("get User route");
};
