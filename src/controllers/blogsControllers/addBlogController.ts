import { Request, Response } from "express";

export const addBlogController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("blogs add route");
};
