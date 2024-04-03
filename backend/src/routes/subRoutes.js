import express from "express";
import { createSub } from "../controllers/sub-controller.js";

export const subRouter = express.Router();

subRouter.post('/sub', createSub)