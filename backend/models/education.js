import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degreeName: { type: String },
    fieldOfStudy: { type: String },
    instituteName: { type: String },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    isPresent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const educationModel =
  mongoose.models.education || mongoose.model("education", educationSchema);

export default educationModel;
