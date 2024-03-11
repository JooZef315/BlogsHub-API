import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rootRouter } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const PORT = process.env.PORT || 3001;

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", rootRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 not found" });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
