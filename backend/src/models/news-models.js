import mongoose from "mongoose";

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
});

export const NewsModel = mongoose.model("news", newsSchema);
