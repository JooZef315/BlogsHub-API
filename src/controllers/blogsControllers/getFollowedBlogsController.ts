import { Request, Response } from "express";

export const getFollowedBlogsController = (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.query);
  res.send("followed blogs get route");
};