import mongoose from "mongoose";

const newsletters = new mongoose.Schema({
  newsletterName: String,
  isSelected: Boolean,
});

export const NewslettersModel = mongoose.model("newsletters", newsletters);

const subSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  username: {
    type: String,
  },
  Newsletters: [newsletters],
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});
export const SubModel = mongoose.model("Sub", subSchema);
