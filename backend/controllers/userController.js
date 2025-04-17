import contactModel from "../models/contact.js";
import projectModel from "../models/project.js";
import experienceModel from "../models/experience.js";
import educationModel from "../models/education.js";
import profileInfoModel from "../models/profileInfo.js";
import technologyModel from "../models/technology.js";

// Contact Form
export const contact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    await contactModel.create({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: "Message sent",
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while submitting contact form",
    });
  }
};

// GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({
        success: true,
        message: "Projects fetched successfully",
        projects,
      });
  } catch (err) {
    console.error("Fetch Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: err.message,
    });
  }
};

// Get All Experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching experiences", details: err.message });
  }
};

// READ All Education 
export const getEducations = async (req, res) => {
  try {
    const educations = await educationModel.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, educations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching education",
      details: err.message,
    });
  }
};

// GET All Technologies
export const getTechnologies = async (req, res) => {
  try {
    const technologies = await technologyModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, technologies });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching technologies", details: err.message });
  }
};

// fetch Profile Information Controller
export const getProfileInfo = async (req, res) => {
  try {
    const profileData = await profileInfoModel.findOne({});

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: "Profile information not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      profileData,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching profile information",
    });
  }
};