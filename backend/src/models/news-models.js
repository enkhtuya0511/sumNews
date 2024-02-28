import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true},
    category: {
        type: String, required: true,
        enum: { values: ["Health", "Sports", "Tech", "Entertainment", "Other"]}
    },
    image: String,
    author: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    createdOn: Date
});

export const NewsModel = mongoose.model("news", newsSchema)