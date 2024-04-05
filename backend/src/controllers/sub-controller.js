import nodemailer from "nodemailer";
import { SubModel } from "../models/sub-model.js";
import { generateSubHtml } from "../subTemp.js";

export const createSub = async (req, res) => {
  try {
    const body = req.body;

    // 1) Check if user exists
    const user = await SubModel.findOne({ email: body.email });
    console.log(user, "user");
    if (user) {
      res.status(200).json({ type: "already_subscribed", message: "Given email address is already subscribed, thank you!" });
      return;
    }

    // 2)
    const newSubscriber = await SubModel.create({
      email: body.email,
      username: body.username,
      firstUp: body["0"],
      MilitarySpace: body["1"],
      SpaceNews: body["2"],
    });

    console.log("newSub", newSubscriber, newSubscriber._id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "newsletter.project03@gmail.com",
        pass: "uncj scwg whbb fhxh",
      },
    });

    const userID = newSubscriber._id;
    const mailOptions = {
      from: "newsletter.project03@gmail.com",
      to: body.email,
      subject: "Newsletter.: Please Confirm Subscription",
      text: "testMail",
      html: generateSubHtml(userID),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log("Email sent to: " + body.email);
      }
    });
    // console.log("data", body, body["0"]);
    // console.log("sub", newSubscriber);

    res.status(201).json({
      status: "success",
      data: newSubscriber,
      message: "Thank you, your sign-up request was successful! Please check your email inbox to confirm.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err });
  }
};

export const confirmSub = async (req, res) => {
  const body = req.params();
  console.log(body);
};
