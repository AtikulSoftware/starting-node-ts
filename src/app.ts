require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";

// create app
const app = express();
app.use(express.json({ limit: "50mb" })); // body parser
app.use(cookieParser()); // cookie parser

// cors setup
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// user routes
app.use("/api/users", userRouter);

// unknown route
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// error handle
app.use(ErrorMiddleware);

export default app;
