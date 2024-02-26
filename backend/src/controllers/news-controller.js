import { NewsModel } from "../models/newsModel.js";
import nodemailer from "nodemailer"

export const getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.find({});
    res.status(200).json({ status: "success", results: news.length, data: news})
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error" });
  }
};

export const createNews = async (req, res) => {
    try {
        const body = req.body
        const newData = await NewsModel.create({
            title: body.title,
            category: body.category,
            image: body.image,
            author: body.author,
            description: body.description,
            createdOn: new Date()
        })
        res.status(201).json({ status: "success", data: newData})
    } catch(err) {
        console.log(err)
        res.status(400).json({ status: "error"})
    }
}