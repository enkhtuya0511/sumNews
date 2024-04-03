import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  username: {
    type: String
  },
  firstUP: {
    type:Boolean,
    default: false
  },
  MilitarySpace: {
    type:Boolean,
    default: false
  },
  SpaceNews: {
    type:Boolean,
    default: false
  }
});
export const SubModel = mongoose.model("Sub", subSchema);