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

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "newsletter.project03@gmail.com",
    //     pass: "uncj scwg whbb fhxh",
    //   },
    // });

    // const mailOptions = {
    //   from: "newsletter.project03@gmail.com",
    //   to: email,
    //   subject: "Newsletter.: Please Confirm Subscription",
    //   text: "testMail",
    //   html: generateSubHtml(userID),
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    res.status(201).json({ status: "success", data: newSubscriber });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err });
  }
};

// export const confirmSub = async (req, res) => {
//   try {
//     const id = req.params.id;
//     // 1) Check if user exists
//     // const user = await SubModel.findById(id);
//     // if (!user) {
//     //   res.status(204).json({ message: "Invalid User ID"});
//     //   return;
//     // }

//     // 2)
//     const updatedData = await SubModel.findByIdAndUpdate(id, { isConfirmed: true });
//     res.status(200).json({ status: "success", updatedData: updatedData });
//   } catch (err) {
//     console.log("error", err);
//     res.status(400).json({ status: "error" });
//   }
// };
