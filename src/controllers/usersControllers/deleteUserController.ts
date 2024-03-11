import { Request, Response } from "express";

export const deleteUserController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("del User route");
};
