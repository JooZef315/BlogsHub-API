import { Request, Response } from "express";

export const getBlogController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("blog get route");
};
