import { Request, Response } from "express";

export const editBlogController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("blogs edit route");
};
