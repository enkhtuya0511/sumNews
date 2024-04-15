import nodemailer from "nodemailer";
import { CronJob } from "cron";
// import PQueue from "p-queue";
import { NewsModel } from "../models/news-models.js";
import { mailTemp1 } from "../mailTemp1.js";
// import { summarizeArticle } from "../controllers/news-controller.js";

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

export const testMail = async (req, res) => {
  try {
    // await fetchNews("upshot");
  } catch (err) {
    console.log("error", err);
  }
};

// export const fetchNews = async (section) => {
//   // ->>>
//   const today = new Date();
//   const todayD = today.getDate();
//   const lastMon = today.getDate() - 7;
//   console.log("date", todayD, lastWeek);

//   let apiUrl;
//   let newsArr = [];

//   if (section === "space")
//     apiUrl = `https://api.spaceflightnewsapi.net/v4/articles?published_at_gte=${yesterday.toISOString()}`;
//   else
//     apiUrl = `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?limit=50&api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`;

//   const response = await axios.get(apiUrl);

//   //getting urls
//   if (response.data && response.data.results) {
//     const articles = response.data.results;
//     newsArr = articles
//       .filter((article) => {
//         const articleDate =
//           section === "space"
//             ? new Date(article.published_at)
//             : new Date(article.published_date);
//         console.log("articleDate", articleDate.getDate(), articleDate);
//         return (
//           lastMon < articleDate.getDate() < today &&
//           articleDate.getFullYear() === today.getFullYear() &&
//           articleDate.getMonth() <= today.getMonth()
//         );
//       })
//       .map((el) => ({
//         url: el.url,
//         subsection: el.subsection,
//         newsSite: el.news_site,
//       }));
//   } else {
//     console.error("No results found");
//   }

//   // summarizing articles
//   const queue = new PQueue({ concurrency: 1 });
//   let summarizedNews = await queue.addAll(
//     newsArr.map((cur, index) => {
//       return async () => {
//         if (index % 5 === 0 && index !== 0) {
//           const time = new Promise((resolve, reject) => {
//             setTimeout(() => resolve(), 60000);
//           });
//           await time;
//         }
//         return await summarizeArticle(
//           cur.url,
//           section,
//           cur.subsection,
//           cur.newsSite
//         );
//       };
//     })
//   );

//   summarizedNews = summarizedNews.filter((el) => el !== null).map((el) => el);

//   ///maillll //nodemailer
//   const subUsers = await UserModel.find({ role: "user" });
//   console.log("users", subUsers);

//   subUsers.forEach((user) => {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "newsletter.project03@gmail.com",
//         pass: "uncj scwg whbb fhxh",
//       },
//     });

//     const mailOptions = {
//       from: "newsletter.project03@gmail.com",
//       to: user.email,
//       subject: "Subject",
//       text: "testMail",
//       html: generateHtml({
//         title: newData.title,
//         text: newData.summary,
//         category: newData.section,
//         image: newData.imageUrl,
//         author: newData.author,
//         createdOn: newData.publishedDate,
//         source: newData.source,
//       }),
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//         console.log("Email sent to: " + user.email);
//       }
//     });
//   });
// };
