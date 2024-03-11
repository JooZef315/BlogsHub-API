import { Request, Response } from "express";

export const getCommentController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("get Comment route");
};
