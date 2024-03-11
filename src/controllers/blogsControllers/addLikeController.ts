import { Request, Response } from "express";

export const addLikeController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("blogs like route");
};
