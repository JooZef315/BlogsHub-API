import { Request, Response } from "express";

export const editCommentController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("edit Comment route");
};
