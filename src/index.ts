import express from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rootRouter } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { connectDB } from "./config/Db";
// const Blog = require("./models/blogModel");
// const User = require("./models/userModel");
// const Comment = require("./models/commentModel");
// import Blog from "./models/blogModel";
// import User from "./models/userModel";
// import Comment from "./models/commentModel";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
connectDB();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", rootRouter);

// app.get(
//   "/api/v1/test",
//   asyncHandler(async (req, res) => {
//     const bb = await Blog.findOne({
//       title: "post 1",
//     }).populate("likedBy");
//     res.status(200).json({ data: bb });
//   })
// );

app.all(
  "*",
  asyncHandler(async (req, res) => {
    res.status(404).json({ message: "404 not found" });
  })
);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
