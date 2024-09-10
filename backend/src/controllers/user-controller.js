import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-models.js";
import { sendResetCodeByEmail } from "../service/email.js";

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
    const filteredUser = await UserModel.findById(req.params.id);
    res.status(200).json({ status: "success", data: filteredUser });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "error", message: "No user found with that ID" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !password) {
      res.status(403).json({ message: "Email, password are required" });
      return;
    }

    // const existingUser = UserModel.findOne({ email });
    // if (existingUser) {
    //   res.status(405).json({ message: "Email already in use" });
    //   return;
    // }

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      createdOn: new Date(),
    });
    const token = jwt.sign({ user_id: newUser._id, email: newUser.email }, process.env.PRIVATEKEY, { expiresIn: "15d" });
    res.status(200).json({ status: "success", token });
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    await sendResetCodeByEmail(email, resetToken);
    res.status(200).json({ status: "success", message: "Reset token sent to your email" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: error });
  }
};

export const resetPassword = async (req, res) => {
  const { resetPasswordToken, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({ resetPasswordToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "Token expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ status: "success", message: "Password reset successful" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: error });
  }
};

export const currentUser = async (req, res) => {
  const filteredUser = await UserModel.findOne({ _id: req.user.user_id });
  res.status(200).json({ status: "success", data: filteredUser });
};

export const signInWithGoogle = async (req, res) => {
  try {
    // uid
    const { email, name, photoURL } = req.body;
    const filteredUser = await UserModel.findOne({ email });

    // 1) Check if user exists
    if (filteredUser) {
      const token = jwt.sign({ user_id: filteredUser._id, email: filteredUser.email }, process.env.PRIVATEKEY, { expiresIn: "15d" });
      res.status(200).json({ status: "success", token, filteredUser });
      return;
    }
    // 2) If user doesn't exist ->>>>> create acc ^^
    const newUser = await UserModel.create({
      email,
      name,
      image: photoURL,
      createdOn: new Date(),
    });
    const token = jwt.sign({ user_id: newUser._id, email: newUser.email }, process.env.PRIVATEKEY, { expiresIn: "15d" });
    res.status(200).json({ status: "success", token, newUser });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ status: "failed", message: err });
  }
};
