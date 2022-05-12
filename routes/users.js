import express from "express";

import {
  createUser,
  getUsers,
  getById,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getById);

userRouter.delete("/:id", deleteUser);

userRouter.post("/", createUser);

userRouter.patch("/:id", updateUser);

export default userRouter;