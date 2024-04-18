// export const testMail = async (req, res) => {
//     try {
//       // Schedule the email sending task to run every Wed at 12 PM
//       const testJob = new CronJob(
//         "0 12 * * 3",
//         async function () {
//           await fetchNews("upshot");
//         },
//         null,
//         true,
//         "Asia/Ulaanbaatar"
//       );
//     } catch (err) {
//       console.log("error", err);
//     }
//   };

//   export const fetchNews = async (section) => {
//     // ->>>
//     const today = new Date();
//     const todayD = today.getDate();
//     const lastMon = today.getDate() - 7;
//     console.log("date", todayD, lastMon);

//     let apiUrl;
//     let newsArr = [];

//     if (section === "space") apiUrl = `https://api.spaceflightnewsapi.net/v4/articles?published_at_gte=${yesterday.toISOString()}`;
//     else apiUrl = `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?limit=50&api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`;

//     const response = await axios.get(apiUrl);

//     //getting urls
//     if (response.data && response.data.results) {
//       const articles = response.data.results;
//       newsArr = articles
//         .filter((article) => {
//           const articleDate = section === "space" ? new Date(article.published_at) : new Date(article.published_date);
//           console.log("articleDate", articleDate.getDate(), articleDate);
//           return (
//             lastMon < articleDate.getDate() &&
//             articleDate.getDate() < today &&
//             articleDate.getFullYear() === today.getFullYear() &&
//             articleDate.getMonth() <= today.getMonth()
//           );
//         })
// .map((el) => ({
//   url: el.url,
//   subsection: el.subsection,
//   newsSite: el.news_site,
// }));
//     } else {
//       console.error("No results found");
//     }

//     // summarizing articles
// const queue = new PQueue({ concurrency: 1 });
// let summarizedNews = await queue.addAll(
//   newsArr.map((cur, index) => {
//     return async () => {
//       if (index % 5 === 0 && index !== 0) {
//         const time = new Promise((resolve, reject) => {
//           setTimeout(() => resolve(), 60000);
//         });
//         await time;
//       }
//       return await summarizeArticle(cur.url, section, cur.subsection, cur.newsSite);
//     };
//   })
// );

//     summarizedNews = summarizedNews.filter((el) => el !== null).map((el) => el);

//     ///maillll //nodemailer
//     const confirmedUsers = await SubModel.find({ isConfirmed: true });
//     console.log("users", confirmedUsers);

//     confirmedUsers.forEach((user) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "newsletter.project03@gmail.com",
//       pass: "uncj scwg whbb fhxh",
//     },
//   });

//       const mailOptions = {
//         from: "newsletter.project03@gmail.com",
//         to: user.email,
//         subject: "Subject",
//         text: "testMail",
//         html: mailTemp1(summarizedNews),
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//           console.log("Email sent to: " + user.email);
//         }
//       });
//     });
//   };

// export const summarizeArticle = async (url, section, subsection, newsSite) => {
//   const options = {
//     method: "POST",
//     url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/",
//     headers: {
//       "content-type": "application/json",
//       "X-RapidAPI-Key": "3ec94a6abdmsh459f2b595599252p12a984jsnb5191ed3a754",
//       "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
//     },
//     data: {
//       url,
//       min_length: 130,
//       max_length: 300,
//       is_detailed: true,
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     if (response.data.summary[0]?.heading) {
//       return null;
//     }

//     const date = new Date(response.data.article_pub_date);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     const formattedDate = `${year}-${month}-${day}`;
//     console.log(formattedDate); // Output: 2024-03-30

//     if (response.data) {
//       // Destructuring data
//       const newData = await NewsModel.create({
//         title: response.data.article_title,
//         section,
//         subsection,
//         author: response.data.article_authors === null ? newsSite : response.data.article_authors,
//         summary: response.data.summary,
//         imageUrl: response.data.article_image,
//         publishedDate: formattedDate,
//         source: response.data.article_url,
//       });

//       return newData;
//     } else {
//       console.log(url, "data is null or undefined");
//       return null;
//     }
//   } catch (err) {
//     console.log(url, err.response.data.detail);
//     return null;
//   }
// };
