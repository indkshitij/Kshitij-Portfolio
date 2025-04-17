import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String },
    projectLink: { type: String },
    githubLink: { type: String },
    imageUrl: { type: String },
    inDepthDetail: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);
const projectModel =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default projectModel;
