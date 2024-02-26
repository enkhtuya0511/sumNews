import { UserModel } from "../models/user-models.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res
      .status(200)
      .json({ status: "success", results: users.length, data: users });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const filteredUser = await UserModel.findById(req.params.id);
    res.status(200).json({ status: "success", data: filteredUser });
  } catch (err) {
    console.log(err);
    res
      .status(204)
      .json({ status: "error", message: "No user found with that ID" });
  }
};

export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await UserModel.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      createdOn: new Date(),
    });
    res.status(200).json({ status: "success", data: newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const updatedPassword = await bcrypt.hash(body.password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
      username: body.username,
      email: body.email,
      password: updatedPassword,
    });
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error" });
  }
};