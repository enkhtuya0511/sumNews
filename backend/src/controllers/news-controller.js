import nodemailer from "nodemailer";
import axios from "axios";
import { NewsModel } from "../models/news-models.js";
import { UserModel } from "../models/user-models.js";
import { generateHtml } from "../template.js";

export const getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.find({});
    res
      .status(200)
      .json({ status: "success", results: news.length, data: news });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error" });
  }
};

export const createNews = async (req, res) => {
  try {
    const body = req.body;

    //summarizer
    const options = {
      method: "POST",
      url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "9044b65ef6msh161e4b8397cde59p1ce13ejsn4d3175aaaae7",
        "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
      },
      data: { text: body.description, min_length: 150, max_length: 300 },
    };

    const textSum = await axios.request(options);
    console.log(textSum.data.summary);

    const newData = await NewsModel.create({
      title: body.title,
      category: body.category,
      image: body.image,
      author: body.author,
      description: textSum.data.summary,
      source: body.source,
      createdOn: new Date().toISOString(),
    });

    const subUsers = await UserModel.find({ role: "user" });
    console.log("users", subUsers);

    //nodemailer
    subUsers.forEach((user) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "newsletter.project03@gmail.com",
          pass: "uncj scwg whbb fhxh",
        },
      });

      const mailOptions = {
        from: "newsletter.project03@gmail.com",
        to: user.email,
        subject: "Subject",
        text: "testMail",
        html: generateHtml({
          title: newData.title,
          text: newData.description,
          category: newData.category,
          image: newData.image,
          author: newData.author,
          createdOn: newData.createdOn,
          source: newData.source,
        }),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          console.log("Email sent to: " + user.email);
        }
      });
    });

    res.status(201).json({ status: "success", data: newData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err });
  }
};
