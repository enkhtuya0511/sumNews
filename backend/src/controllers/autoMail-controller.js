import { CronJob } from "cron";
import nodemailer from "nodemailer";
import { NewsModel } from "../models/news-models.js";
import { mailTemp1 } from "../mailTemp1.js";

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

  const testArr = articles.map((article) => ({
    title: article.title,
    imageUrl: article.imageUrl,
    author: article.author,
    summary: article.summary,
    source: article.source,
    publishedDate: article.publishedDate.toLocaleString("en-GB", {
      timeZone: "UTC",
    }),
  }));

  const mailOptions = {
    from: "newsletter.project03@gmail.com",
    to: "enkhtuya.b511@gmail.com",
    subject: "Weekly Update",
    text: "testMail ^^",
    html: mailTemp1(testArr),
  };

  // Schedule the email sending task to run every Wed at 6 PM
  const job = new CronJob(
    "0 7 20 * * 3", // cronTime
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
