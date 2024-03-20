import { UserModel } from "../models/user-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      res.status(400).json({ message: "Please provide email and password!" });
      return;
    }

    // 2) Check if user exists && password is correct
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Incorrect email or password" });
      return;
    }

    const token = jwt.sign({ user_id: user._id, email: user.email },
        "MeAndBrother", { expiresIn: "3d" });
    res.status(200).json({ status: "success", token});
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ status: "failed", message: error});
  }
};
