import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  Email: [
    {
      email: String,
    },
  ],
});
export const Email = mongoose.model("Email", quizSchema);