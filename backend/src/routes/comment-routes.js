import express from "express";
import { createComment, deleteComment } from "../controllers/comment-controller.js";

export const commentRouter = express.Router();

commentRouter.post("/commentCreate/:id", createComment);
commentRouter.delete("/commentDelete/:CommentId", deleteComment);
