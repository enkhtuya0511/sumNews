import express from "express";
import { getAllNews, createNews } from "../controllers/news-controller.js";

export const newsRouter = express.Router();

newsRouter.route("/news").get(getAllNews).post(createNews) 