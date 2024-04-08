import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import schedule from 'node-schedule';
import { userRouter } from "./routes/user-routes.js";
import { newsRouter } from "./routes/newsRoutes.js";
import { subRouter } from "./routes/subRoutes.js";

const app = express();
const port = 7001;

app.use(express.json());
app.use(cors());

//Routers
app.use(userRouter);
app.use(newsRouter);
app.use(subRouter)

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://enkhe:20050511131Enkhe@cluster0.knivtsw.mongodb.net/news`);
  console.log("database connected!");
};

connectDB();

app.listen(port, () => {
  console.log(`Your server is running on: http://localhost:${port}`);
});

const job = schedule.scheduleJob({hour: 19, minute: 46, dayOfWeek: 1}, function(){
  console.log('Time for tea!');
});
