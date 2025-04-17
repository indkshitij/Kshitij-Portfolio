import mongoose from "mongoose";

const profileInfoSchema = new mongoose.Schema(
  {
    name: { type: String },
    heading: { type: String },
    about: { type: String },
    image: { type: String },
    statistics: [
      {
        name: { type: String },
        number: { type: Number },
      },
    ],
    socials: {
      github: { type: String, default: "" },
      leetcode: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      email: { type: String, default: "" },
      linktree: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const profileInfoModel =
  mongoose.models.profileInfo ||
  mongoose.model("profileInfo", profileInfoSchema);

export default profileInfoModel;
