import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
  {
    name: { type: String },
    imageUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const technologyModel =
  mongoose.models.technology || mongoose.model("technology", technologySchema);

export default technologyModel;
