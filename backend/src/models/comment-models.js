import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  id: String,
  comment: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  CommentId: {
    type: String,
    unique: true,
    default: () => Math.floor(10000 + Math.random() * 90000).toString(),
    required: true,
  },
});

export const Comment = mongoose.model("comment", userSchema);
