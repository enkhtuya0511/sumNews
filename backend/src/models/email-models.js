import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  Email: [
    {
      email: String,
    },
  ],
});
export const Email = mongoose.model("Email", emailSchema);
