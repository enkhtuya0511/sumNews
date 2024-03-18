import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user-routes.js";
import { newsRouter } from "./routes/newsRoutes.js";

const app = express();
const port = 7001;

app.use(express.json());
app.use(cors());

//Routers
app.use(userRouter);
app.use(newsRouter);

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://enkhe:20050511131Enkhe@cluster0.knivtsw.mongodb.net/news`);
  console.log("database connected!");
};

connectDB();

app.listen(port, () => {
  console.log(`Your server is running on: http://localhost:${port}`);
});

//NewsApiKey = 34323febc0ac4438992528def0ce62cf
