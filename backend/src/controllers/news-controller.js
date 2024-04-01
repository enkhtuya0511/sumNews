import axios from "axios";
import nodemailer from "nodemailer";
import { NewsModel } from "../models/news-models.js";
import { UserModel } from "../models/user-models.js";
import { generateHtml } from "../template.js";
import PQueue from "p-queue";

export const getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.find({});
    res.status(200).json({ status: "success", results: news.length, data: news });
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

const summarizeArticle = async (url) => {
  const options = {
    method: "POST",
    url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3ec94a6abdmsh459f2b595599252p12a984jsnb5191ed3a754",
      "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
    },
    data: {
      url,
      min_length: 190,
      max_length: 300,
      is_detailed: true,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.summary[0]?.heading) {
      return null;
    }

    if (response.data) {
      // Destructuring data
      const data = {
        title: response.data.article_title,
        author: response.data.article_authors,
        summary: response.data.summary,
        imageUrl: response.data.article_image,
        publishedDate: response.data.article_pub_date,
        url: response.data.article_url,
      };
      return data;
    } else {
      console.log(url, "data is null or undefined");
      return null;
    }
  } catch (err) {
    console.log(url, err.response.data);
    return null;
  }
};

export const fetchNews = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());
    yesterday.setUTCHours(0, 0, 0, 0);

    let mostViewed = [];
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`
    );

    //getting urls
    if (response.data && response.data.results) {
      const articles = response.data.results;
      mostViewed = articles
        .filter((article) => {
          const articleDate = new Date(article.published_date);
          return articleDate.getTime() === today.getTime() || articleDate.getTime() === yesterday.getTime();
        })
        .map((el) => el.url);
    } else {
      console.error("No results found");
    }

    // summarizing articles
    const queue = new PQueue({ concurrency: 1 });
    let summarizedNews = await queue.addAll(
      mostViewed.map((cur, index) => {
        return async () => {
          if (index % 5 === 0 && index !== 0) {
            const time = new Promise((resolve, reject) => {
              setTimeout(() => resolve(), 60000);
            });
            await time;
          }
          return await summarizeArticle(cur);
        };
      })
    );

    summarizedNews = summarizedNews.filter((el) => el !== null).map((el) => el);
    res.status(200).json({ status: "success", data: summarizedNews });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "failed", message: err });
  }
};
