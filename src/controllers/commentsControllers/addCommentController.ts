import { Request, Response } from "express";

export const addCommentController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("add Comment route");
};
