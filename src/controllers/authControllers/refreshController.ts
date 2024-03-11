import { Request, Response } from "express";

export const refreshController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.send("auth refresh route");
};
