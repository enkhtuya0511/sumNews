import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    // required: [true, "Please provide a password"],
    minlength: 7,
  },
  image: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdOn: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export const UserModel = mongoose.model("user", userSchema);

//   passwordConfirm: {
//     type: String,
//     required: [true, "Please confirm your password"],
//     minlength: 7,
//   },
