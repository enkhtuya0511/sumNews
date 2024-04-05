import express from "express";
import { confirmSub, createSub } from "../controllers/sub-controller.js";

export const subRouter = express.Router();

subRouter.post("/sub", createSub);
subRouter.put("/sub/:id", confirmSub)
