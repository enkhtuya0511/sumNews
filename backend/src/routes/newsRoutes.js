import express from "express";
import { getAllNews, createNews, fetchNews, getHomepageNews } from "../controllers/news-controller.js";

export const newsRouter = express.Router();

newsRouter.route("/news").get(getAllNews).post(createNews);
newsRouter.route("/testAPI").post(fetchNews);
newsRouter.route("/homepageNews").get(getHomepageNews);
// newsRouter.route("/testP").get(testPagination)
