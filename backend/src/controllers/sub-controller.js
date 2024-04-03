import { SubModel } from "../models/sub-model.js";

export const createSub = async (req, res) => {
  try {
    const body = req.body;

    const newData = await SubModel.create({
      email: body.email,
      username: body.username,
      firstUp: body['0'],
      MilitarySpace: body['1'],
      SpaceNews: body['2']
    })
    console.log("data", body);
    console.log("sub", newData);
    res.status(201).json({ status: "success", data: newData});
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err });
  }
};
