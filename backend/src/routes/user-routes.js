import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  forgotPassword,
  resetPassword,
  currentUser,
  signInWithGoogle,
} from "../controllers/user-controller.js";
import { login } from "../controllers/login-controller.js";
import { emailSent } from "../controllers/email-controller.js";
import { verifyToken } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", createUser);
userRouter.post("/signInWithGoogle", signInWithGoogle);

userRouter.get("/currentUser", verifyToken, currentUser);

userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);

userRouter.get("/users", verifyToken, getAllUsers);
userRouter.route("/user").get(verifyToken, getUser);
userRouter.post("/email", emailSent);
