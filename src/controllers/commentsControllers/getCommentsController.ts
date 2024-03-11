import { Request, Response } from "express";

export const getCommentsController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("get Comments route");
};
