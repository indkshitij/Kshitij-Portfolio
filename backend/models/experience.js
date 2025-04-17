import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    jobTitle: { type: String },
    companyName: { type: String },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    isPresent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const experienceModel =
  mongoose.models.experience || mongoose.model("experience", experienceSchema);

export default experienceModel;
