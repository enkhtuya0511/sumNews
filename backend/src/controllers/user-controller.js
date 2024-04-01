import { UserModel } from "../models/user-models.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ status: "success", results: users.length, data: users });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error" });
  }
};

export const getUser = async (req, res) => {
  try {
    console.log("params", req.params.id);

    const filteredUser = await UserModel.findById(req.params.id);
    res.status(200).json({ status: "success", data: filteredUser });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error", message: "No user found with that ID" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
      res.status(403).json({ message: "Name, email, and password are required" });
      return;
    }

    const existingUser = UserModel.findOne({ email });
    if (existingUser) {
      res.status(405).json({ message: "Email already in use" });
      return;
    }

    const newUser = await UserModel.create({
      name,
      email,
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
