import { Request, Response } from "express";

export const deleteCommentController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("delete Comment route");
};
