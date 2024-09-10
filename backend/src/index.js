import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user-routes.js";
import { newsRouter } from "./routes/newsRoutes.js";
import { subRouter } from "./routes/subRoutes.js";
import { commentRouter } from "./routes/comment-routes.js";
import { testMail } from "./controllers/autoMail-controller.js";

const app = express();
const port = 7001;

app.use(express.json());
app.use(cors());

//Routers
app.use(userRouter);
app.use(newsRouter);
app.use(subRouter);
app.use(commentRouter);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("database connected!");
  await testMail();
};

connectDB();

app.listen(port, () => {
  console.log(`Your server is running on: http://localhost:${port}`);
});
