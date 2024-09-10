// import nodemailer from "nodemailer";
import { SubModel } from "../models/sub-model.js";
// import { generateSubHtml } from "../subTemp.js";

export const createSub = async (req, res) => {
  try {
    const { email, username, newsletters } = req.body;
    const newsletterObjects = [];

    for (const key in newsletters) {
      if (newsletters.hasOwnProperty(key)) {
        const newsletter = {
          newsletterName: key,
          isSelected: newsletters[key],
        };
        // Add the object to the array
        newsletterObjects.push(newsletter);
      }
    }
    console.log("newsletterObjects:", newsletterObjects);

    // 1) Check if user exists
    const user = await SubModel.findOne({ email });
    if (user) {
      res.status(200).json({
        type: "already_subscribed",
        message: "Given email address is already subscribed, thank you!",
      });
      return;
    }

    // 2)
    const newSubscriber = await SubModel.create({
      email,
      username,
      Newsletters: newsletterObjects,
    });
    console.log("newSubscriber", newSubscriber);
    const userID = newSubscriber._id;

    res.status(201).json({ status: "success", data: newSubscriber });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err });
  }
};
