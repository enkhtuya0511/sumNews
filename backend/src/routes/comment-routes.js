import express from "express";
import {
  getAllComment,
  createComment,
  deleteComment,
} from "../controllers/comment-controller.js";
import { verifyToken } from "../middleware/auth.js";

export const commentRouter = express.Router();

commentRouter.post("/commentCreate", verifyToken, createComment);
commentRouter.get("/comment", getAllComment);
commentRouter.delete("/commentDelete/:CommentId", verifyToken, deleteComment);
