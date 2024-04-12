import nodemailer from "nodemailer";
import { CronJob } from "cron";
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
