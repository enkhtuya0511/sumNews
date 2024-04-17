import axios from "axios";
import nodemailer from "nodemailer";
import { CronJob } from "cron";
import PQueue from "p-queue";
import { NewsModel } from "../models/news-models.js";
import { SubModel } from "../models/sub-model.js";
import { mailTemp1 } from "../mailTemp1.js";
import { summarizeArticle } from "../controllers/news-controller.js";

export const autoMailSender = async (req, res) => {
  const articles = await NewsModel.find({
    subsection: "Europe",
    section: "world",
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "newsletter.project03@gmail.com",
      pass: "uncjscwgwhbbfhxh",
    },
  });

  const mailOptions = {
    from: "newsletter.project03@gmail.com",
    to: "enkhtuya.b511@gmail.com",
    subject: "Weekly Update",
    text: "testMail ^^",
    html: mailTemp1(articles),
  };

  // Schedule the email sending task to run every Wed at 6 PM
  const job = new CronJob(
    "0 33 22 * * 3", // cronTime
    function () {
      // Send the email
      try {
        transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }, // onTick
    null, // onComplete
    true, // start
    "Asia/Ulaanbaatar" // timeZone
  );
};

export const testMail = async () => {
  try {
    // Schedule the email sending task to run every Wed at 12 PM
    const testJob = new CronJob(
      "28 12 * * 3",
      async function () {
        await fetchNews("upshot");
      },
      null,
      true,
      "Asia/Ulaanbaatar"
    );

    // Start the cron job
    testJob.start();
  } catch (err) {
    console.log("error", err);
  }
};

export const fetchNews = async (section) => {
  // Define last week and today's dates
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  // Define API URL based on section
  let apiUrl;
  if (section === "space") {
    apiUrl = `https://api.spaceflightnewsapi.net/v4/articles?published_at_gte=${lastWeek.toISOString()}`;
  } else {
    apiUrl = `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?limit=50&api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`;
  }

  try {
    const response = await axios.get(apiUrl);

    // Handle response and filter articles based on date
    if (response.data && response.data.results) {
      const articles = response.data.results;
      const newsArr = articles
        .filter((article) => {
          const articleDate = section === "space" ? new Date(article.published_at) : new Date(article.published_date);
          return articleDate > lastWeek && articleDate <= today;
        })
        .map((el) => ({
          url: el.url,
          subsection: el.subsection,
          newsSite: el.news_site,
        }));

      // Summarize articles
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

      // Fetch confirmed users and send email
      const confirmedUsers = await SubModel.find({ isConfirmed: true });
      console.log("users", confirmedUsers);
      await sendEmails(confirmedUsers, summarizedNews);
    } else {
      console.error("No results found");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

const sendEmails = async (users, news) => {
  for (const user of users) {
    try {
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
        text: "Test Mail",
        html: mailTemp1(news),
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent to:", user.email);
    } catch (error) {
      console.error("Error sending email to", user.email, ":", error);
    }
  }
};
