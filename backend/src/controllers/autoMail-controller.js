import axios from "axios";
import nodemailer from "nodemailer";
import { CronJob } from "cron";
import PQueue from "p-queue";
import { SubModel } from "../models/sub-model.js";
import { mailTemp1 } from "../mailTemp1.js";
import { summarizeArticle } from "../controllers/news-controller.js";

export const testMail = async () => {
  try {
    let newsletter;
    let cronTime;
    const today = new Date().getDay();
    if (today === 2 || today === 4 || today === 6) {
      newsletter = "upshot";
      cronTime = `0 11 * * ${today}`;
    } else if (today === 1 || today === 3 || today === 5) {
      newsletter = "space";
      cronTime = `40 14 * * ${today}`;
    }
    console.log("first", newsletter, today, cronTime);

    const testJob = new CronJob(
      cronTime,
      async function () {
        if (newsletter) {
          await fetchNews(newsletter);
        }
      },
      null,
      true,
      "Asia/Ulaanbaatar"
    );

    const dailyNews = new CronJob(
      "20 15 * * *",
      async function () {
        await fetchNews("mostViewed");
        console.log("dailyNews ^-^");
      },
      null,
      true,
      "Asia/Ulaanbaatar"
    );

    // Start the cron job
    testJob.start();
    dailyNews.start();
  } catch (err) {
    console.log("error", err);
  }
};

export const fetchNews = async (section) => {
  // Define yesterday and today's dates
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Define API URL based on section
  let apiUrl;
  if (section === "space") {
    apiUrl = `https://api.spaceflightnewsapi.net/v4/articles?published_at_gte=${yesterday.toISOString()}`;
  } else if (section === "mostViewed") {
    apiUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`;
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
          if (section === "space" || section === "upshot") {
            return articleDate >= yesterday || articleDate === today;
          } else if (section === "mostViewed") {
            return articleDate === today;
          }
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
      // const confirmedUsers = await SubModel.find({ isConfirmed: true });
      const subscribers = await SubModel.find({});
      console.log("subscribers", subscribers);

      const filteredUsers = subscribers.filter((user) => {
        return user.Newsletters.some((newsletter) => {
          return newsletter.newsletterName === section && newsletter.isSelected === true;
        });
      });
      console.log("filteredUsers", filteredUsers);
      await sendEmails(filteredUsers, summarizedNews);
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
