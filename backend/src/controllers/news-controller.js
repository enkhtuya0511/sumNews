import nodemailer from "nodemailer";
import axios from "axios";
import { NewsModel } from "../models/news-models.js";
import { UserModel } from "../models/user-models.js";
import { generateHtml } from "../template.js";

import * as PlayHT from "playht";

PlayHT.init({
  apiKey: "39fa14c819d64815a8f4bcad18f2d970",
  userId: "35Zbz2LgmBPQ1HINztTuKEkbr8K2",
  defaultVoiceId:
    "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
  defaultVoiceEngine: "PlayHT2.0",
});

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
    const newData = await NewsModel.create({
      title: body.title,
      category: body.category,
      image: body.image,
      author: body.author,
      description: body.description,
      createdOn: new Date(),
    });

    const subUsers = await UserModel.find({ role: "user" });
    console.log("users", subUsers);

    //audio
    // const options = {
    //   method: "POST",
    //   url: "https://api.play.ht/api/v2/tts",
    //   headers: {
    //     // accept: "application/json",
    //     accept: "text/event-stream",
    //     "content-type": "application/json",
    //     AUTHORIZATION: "39fa14c819d64815a8f4bcad18f2d970",
    //     "X-USER-ID": "35Zbz2LgmBPQ1HINztTuKEkbr8K2",
    //   },
    //   data: {
    //     text: newData.description,
    //     voice:
    //       "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
    //     output_format: "mp3",
    //     voice_engine: "PlayHT2.0",
    //   },
    // };

    // const audioUrl = "";
    // const audio = await axios.request(options);

    const generated = await PlayHT.generate(newData.description);

    // Grab the generated file URL
    const { audioUrl } = generated;
    // console.log("while", audio.data.event);

    console.log("before text transform");
    console.log("after text transform");
    // console.log(audio.data);
    // const audioUrl = audio.data.url;
    // .then(function (response) {
    //   console.log(response.data);
    //   audioUrl = response.data.url;
    //   console.log("audioUrl", audioUrl);
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });

    console.log("audio", audioUrl);
    // nodemailer

    subUsers.forEach((user) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "enkhtuya.b2051@gmail.com",
          pass: "xzdw koit uffg otpr",
        },
      });

      const mailOptions = {
        from: "enkhtuya.b2051@gmail.com",
        to: user.email,
        subject: "Subject",
        text: "testMail",
        html: generateHtml({
          title: newData.title,
          text: newData.description,
          category: newData.category,
          image: newData.image,
          author: newData.author,
          audio: audioUrl,
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
    res.status(400).json({ status: "error" });
  }
};
