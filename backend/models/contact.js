import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const contactModel =
  mongoose.models.contact || mongoose.model("contact", contactSchema);

export default contactModel;
