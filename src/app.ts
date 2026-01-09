import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

// load env variables
dotenv.config();

import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";

// create app
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// cors setup
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// user routes
app.use("/api/users", userRouter);

// unknown route
app.use("/{*any}", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// error handle
app.use(ErrorMiddleware);

export default app;
