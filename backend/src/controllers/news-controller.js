import axios from "axios";
import nodemailer from "nodemailer";
import { NewsModel } from "../models/news-models.js";
import { UserModel } from "../models/user-models.js";
import { generateHtml } from "../template.js";
import PQueue from "p-queue";

export const getAllNews = async (req, res) => {
  const { section } = req.query;
  try {
    if (section) {
      const news = await NewsModel.find({ section: section });
      res.status(200).json({ status: "success", results: news.length, data: news });
    } else {
      const news = await NewsModel.find({});
      res.status(200).json({ status: "success", results: news.length, data: news });
    }
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error" });
  }
};

export const getHomepageNews = async (req, res) => {
  try {
    const news = await NewsModel.find({}).sort({ section: 1, publishedDate: -1 });
    const updatedNews = {};

    //Group news articles by section
    news.forEach((article) => {
      const { section } = article;
      if (!updatedNews[section]) updatedNews[section] = [];
      return updatedNews[section].push(article);
    });

    //1-mostViewed(get the first three)
    const mostViewed = updatedNews.mostViewed?.slice(0, 3);

    //2-Sections(get the first news article from each section)
    const sections = [];
    const sectionNames = ["health", "space", "science", "upshot", "travel"];
    sectionNames.forEach((section) => {
      const sortedArticles = updatedNews[section];
      if (sortedArticles) {
        sections.push(sortedArticles[0]);
      }
    });

    //3-Global News (get the first four news article from each subsection)
    const globalNews = {};
    updatedNews.world?.forEach((article) => {
      const { subsection } = article;
      if (!globalNews[subsection]) globalNews[subsection] = [];
      if (globalNews[subsection].length < 4) {
        globalNews[subsection].push(article);
      }
    });

    //4-Most Popular
    const mostPopular = updatedNews.mostViewed?.slice(3, 9);

    //5-Additional
    const upshot = updatedNews.upshot?.slice(0, 14);

    res.status(200).json({ status: "success", mostViewed, sections, globalNews, mostPopular, upshot });
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
      section: body.category,
      imageUrl: body.image,
      author: body.author,
      summary: textSum.data.summary,
      source: body.source,
      publishedDate: new Date().toISOString(),
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
          text: newData.summary,
          category: newData.section,
          image: newData.imageUrl,
          author: newData.author,
          createdOn: newData.publishedDate,
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

const summarizeArticle = async (url, section, subsection, newsSite) => {
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

    const date = new Date(response.data.article_pub_date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Output: 2024-03-30

    if (response.data) {
      // Destructuring data
      const newData = await NewsModel.create({
        title: response.data.article_title,
        section,
        subsection,
        author: response.data.article_authors === null ? newsSite : response.data.article_authors,
        summary: response.data.summary,
        imageUrl: response.data.article_image,
        publishedDate: formattedDate,
        source: response.data.article_url,
      });

      return newData;
    } else {
      console.log(url, "data is null or undefined");
      return null;
    }
  } catch (err) {
    console.log(url, err.response.data.detail);
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
    console.log("today", today.getDate());
    console.log("yesterday", yesterday.getDate());
    const { section } = req.body;
    let apiUrl;
    let newsArr = [];

    if (section === "mostViewed")
      apiUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?limit=10&api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`;
    else if (section === "space") {
      apiUrl = `https://api.spaceflightnewsapi.net/v4/articles?published_at_gte=${yesterday.toISOString()}`;
    } else
      apiUrl = `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?limit=50&api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`;

    const response = await axios.get(apiUrl);

    //getting urls
    if (response.data && response.data.results) {
      const articles = response.data.results;
      newsArr = articles
        .filter((article) => {
          const articleDate = section === "space" ? new Date(article.published_at) : new Date(article.published_date);
          console.log("articleDate", articleDate.getDate(), articleDate);
          return (
            (articleDate.getDate() === today.getDate() &&
              articleDate.getFullYear() === today.getFullYear() &&
              articleDate.getMonth() === today.getMonth()) ||
            (articleDate.getDate() === yesterday.getDate() &&
              articleDate.getFullYear() === yesterday.getFullYear() &&
              articleDate.getMonth() === yesterday.getMonth())
          );
        })
        .map((el) => ({
          url: el.url,
          subsection: el.subsection,
          newsSite: el.news_site,
        }));
    } else {
      console.error("No results found");
    }

    // summarizing articles
    const queue = new PQueue({ concurrency: 1 });
    let summarizedNews = await queue.addAll(
      newsArr.map((cur, index) => {
        return async () => {
          if (index % 5 === 0 && index !== 0) {
            const time = new Promise((resolve, reject) => {
              setTimeout(() => resolve(), 60000);
            });
            await time;
          }
          return await summarizeArticle(cur.url, section, cur.subsection, cur.newsSite);
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

{
  /**
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

// Create a nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'your_email_service', // e.g., 'gmail'
  auth: {
    user: 'your_email...com',
    pass: 'your_email_password'
  }
});

// Define the email content
const mailOptions = {
  from: 'your_email...com',
  to: 'recipient...com',
  subject: 'Weekly Update',
  text: 'This is your weekly update email.'
};

// Schedule the email sending task to run every Sunday at 6 PM
const job = schedule.scheduleJob('0 18 * * 0', function() {
  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
});

*/
}
