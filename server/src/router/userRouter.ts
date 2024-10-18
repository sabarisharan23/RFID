import { Message } from "./../../../client/node_modules/esbuild/lib/main.d";
// src/modules/user/user.routes.ts
import { Router, Request, Response } from "express";
import {
  createUser1,
  getAllUsers,
  updateUser,
} from "../controller/userController";
import { addUserSchema } from "../contract/userContract";
import { UserService } from "../service/userService";
import { z } from "zod";

const userRouter = Router();

userRouter.post("/user", createUser1);
userRouter.get("/user", getAllUsers);
userRouter.put("/user/:id", updateUser);

export default userRouter;
