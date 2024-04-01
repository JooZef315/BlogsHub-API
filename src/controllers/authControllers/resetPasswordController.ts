import { Request, Response } from "express";

export const resetPasswordController = (req: Request, res: Response) => {
  // console.log(resetPasswordToken);
  // console.log(tokenExpiredDate);
  // console.log(new Date("2024-03-27T18:36:12.485+00:00"));
  // console.log(tokenExpiredDate > new Date("2024-03-27T18:36:12.485+00:00"));
  console.log(req.originalUrl);
  res.send("auth post reset Password route");
};
