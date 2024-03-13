import express from "express";
import dotenv, { populate } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rootRouter } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { connectDB } from "./config/Db";
import Blog from "./models/blogModel";

import asyncHandler from "express-async-handler";

const PORT = process.env.PORT || 3001;

dotenv.config();
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

app.all(
  "*",
  asyncHandler(async (req, res) => {
    const xx = await Blog.findById("65f076390c7ff6ebeb6b7843").populate(
      "comments"
    );

    console.log(xx);
    res.status(404).json({ message: "404 not found" });
  })
);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
