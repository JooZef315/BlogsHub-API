import { Request, Response } from "express";

export const followUserController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("follow User route");
};
