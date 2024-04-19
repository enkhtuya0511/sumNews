import mongoose from "mongoose";

const comments = new mongoose.Schema({
  email: String,
  comment: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  CommentId: {
    type: String,
    unique: true,
    default: () => Math.floor(10000 + Math.random() * 90000).toString(),
  },
});

export const CommentModel = mongoose.model("comment", comments);

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  section: {
    type: String,
    required: true,
    enum: { values: ["health", "science", "mostViewed", "world", "travel", "space", "upshot"] },
  },
  imageUrl: String,
  author: {
    type: Array,
    required: true,
  },
  summary: {
    type: Array,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  publishedDate: Date,
  subsection: String,
  newsSite: String,
  Comments: [comments],
});

export const NewsModel = mongoose.model("news", newsSchema);
