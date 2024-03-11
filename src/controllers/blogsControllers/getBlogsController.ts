import { Request, Response } from "express";

export const getBlogsController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("blogs get route");
};
