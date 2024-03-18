import express from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rootRouter } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { connectDB } from "./config/Db";
import { error } from "console";

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
//   asyncHandler(async (req, res, next) => {})
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
