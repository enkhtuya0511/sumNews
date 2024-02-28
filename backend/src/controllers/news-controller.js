import { NewsModel } from "../models/news-models.js";
import nodemailer from "nodemailer"

export const getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.find({});
    res.status(200).json({ status: "success", results: news.length, data: news})
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error" });
  }
};

export const createNews = async (req, res) => {
    try {
        const body = req.body
        const newData = await NewsModel.create({
            title: body.title,
            category: body.category,
            image: body.image,
            author: body.author,
            description: body.description,
            createdOn: new Date()
        })

        //mail
        // const transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: 'enkhtuya.b2051@gmail.com',
        //     pass: 'xzdw koit uffg otpr'
        //   }
        // });
        
        // const mailOptions = {
        //   from: 'enkhtuya.b2051@gmail.com',
        //   to: 'reciever@gmail.com',
        //   subject: 'Subject',
        //   text: 'Email content'
        // };
        
        // transporter.sendMail(mailOptions, function(error, info){
        //   if (error) {
        //  console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //     // do something useful
        //   }
        // });

        res.status(201).json({ status: "success", data: newData})
    } catch(err) {
        console.log(err)
        res.status(400).json({ status: "error"})
    }
}