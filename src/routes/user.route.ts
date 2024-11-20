import { Request, Response, Router } from "express";
import { getWelcome } from "../controllers/sample.controller";
const userRouter = Router();

// user router
userRouter.get("/", getWelcome);

userRouter.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ status: true, message: "User Name" });
});

export default userRouter;
