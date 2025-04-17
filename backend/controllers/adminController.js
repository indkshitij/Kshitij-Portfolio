import profileInfoModel from "../models/profileInfo.js";
import contactModel from "../models/contact.js";
import educationModel from "../models/education.js";
import experienceModel from "../models/experience.js";
import projectModel from "../models/project.js";
import technologyModel from "../models/technology.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileWithExt = parts.pop();
  const folder = parts.pop();
  const fileName = fileWithExt.split(".")[0];
  return `${folder}/${fileName}`;
};

// Login Controller
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Both fields are required" });
    }

    if (
      email === process.env.LOGIN_EMAIL &&
      password === process.env.LOGIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 2 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Successfully Logged in",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while logging in",
    });
  }
};

// update Profile Information Controller
export const updateProfileInfo = async (req, res) => {
  try {
    const { name, heading, about, statistics, socials } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!name || !heading || !about || !statistics || !socials) {
      return res.status(400).json({
        success: false,
        message: "All fields (except image) are required",
      });
    }

    let parsedSocials;
    try {
      parsedSocials =
        typeof socials === "string" ? JSON.parse(socials) : socials;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid socials format",
      });
    }

    let parsedStatistics;
    try {
      parsedStatistics = Array.isArray(statistics)
        ? statistics
        : JSON.parse(statistics);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid statistics format",
      });
    }

    let existingProfileInfo = await profileInfoModel.findOne({});
    if (!existingProfileInfo) {
      existingProfileInfo = new profileInfoModel();
    }

    let imageUrl = existingProfileInfo.image;

    if (image) {
      try {
        if (existingProfileInfo.image) {
          const publicId = getPublicIdFromUrl(existingProfileInfo.image);
          await cloudinary.uploader.destroy(publicId);
        }

        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: "profileInfo",
          timeout: 60000,
        });

        imageUrl = uploadResult.secure_url;
      } catch (err) {
        console.error("Image upload error:", err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: err.message,
        });
      }
    }

    const updateData = {
      name,
      heading,
      about,
      statistics: parsedStatistics,
      socials: {
        github: parsedSocials.github,
        leetcode: parsedSocials.leetcode,
        instagram: parsedSocials.instagram,
        linkedin: parsedSocials.linkedin,
        email: parsedSocials.email,
        linktree: parsedSocials.linktree,
      },
      image: imageUrl,
    };

    const updatedData = await profileInfoModel.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating information",
      error: error.message,
    });
  }
};

// fetch Profile Information Controller
export const fetchProfileInfo = async (req, res) => {
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

// fetch Contact Messages Controller
export const fetchMessages = async (req, res) => {
  try {
    const contact = await contactModel.find();

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Messages not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      messageData: contact,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching messages",
    });
  }
};

// Delete Message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactModel.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Messages not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message Deleted",
    });
  } catch (error) {
    console.error("Delete Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting messages",
    });
  }
};


// create PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description, projectLink, githubLink, inDepthDetail } =
      req.body;
    const image = req.file ? req.file?.path.replace(/\\/g, "/") : null;

    if (
      !name ||
      !description ||
      !projectLink ||
      !image ||
      !githubLink ||
      !inDepthDetail
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const cloudinaryUpload = await cloudinary.uploader.upload(image, {
      folder: "project",
    });
    const newProject = new projectModel({
      name,
      description,
      projectLink,
      imageUrl: cloudinaryUpload.secure_url,
      githubLink,
      inDepthDetail,
    });

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    console.error("Create Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: err.message,
    });
  }
};

// Get PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
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

// update PROJECT
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, projectLink, githubLink, inDepthDetail } =
      req.body;

    if (
      !name ||
      !description ||
      !projectLink ||
      !githubLink ||
      !inDepthDetail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields except image are required",
      });
    }

    const existingProject = await projectModel.findById(id);
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    let imageUrl = existingProject.imageUrl;

    if (req.file) {
      const image = req.file.path;

      const publicId = getPublicIdFromUrl(existingProject.imageUrl);
      await cloudinary.uploader.destroy(publicId);

      const cloudinaryUpload = await cloudinary.uploader.upload(image, {
        folder: "project",
      });
      imageUrl = cloudinaryUpload.secure_url;
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        projectLink,
        githubLink,
        inDepthDetail,
        imageUrl,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: err.message,
    });
  }
};

// delete PROJECT
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await projectModel.findByIdAndDelete(id);

    if (deletedProject?.imageUrl) {
      const publicId = getPublicIdFromUrl(deletedProject.imageUrl);
      await cloudinary.uploader.destroy(publicId);
    }

    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: err.message,
    });
  }
};

// Create Education
export const createEducation = async (req, res) => {
  try {
    const {
      degreeName,
      fieldOfStudy,
      instituteName,
      description,
      startDate,
      endDate,
      isPresent,
    } = req.body;

    if (
      !degreeName ||
      !fieldOfStudy ||
      !instituteName ||
      !description ||
      !startDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (!isPresent && !endDate) {
      return res.status(400).json({
        success: false,
        message: "End date is required unless currently studying",
      });
    }

    const newEducation = new educationModel({
      degreeName,
      fieldOfStudy,
      instituteName,
      description,
      startDate,
      endDate: isPresent ? null : endDate,
      isPresent,
    });

    await newEducation.save();

    res.status(201).json({
      success: true,
      message: "Education created",
      education: newEducation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create education",
      details: err.message,
    });
  }
};

// Get Education Records
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

// update Education
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      degreeName,
      fieldOfStudy,
      instituteName,
      description,
      startDate,
      endDate,
      isPresent,
    } = req.body;
    if (
      !degreeName ||
      !fieldOfStudy ||
      !instituteName ||
      !description ||
      !startDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const updatedEducation = await educationModel.findByIdAndUpdate(
      id,
      {
        degreeName,
        fieldOfStudy,
        instituteName,
        description,
        startDate,
        endDate,
        isPresent,
      },
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education: updatedEducation,
    });
  } catch (err) {
    console.error("Update Education Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error updating education",
      details: err.message,
    });
  }
};

// delete Education
export const deleteEducation = async (req, res) => {
  try {
    const deleted = await educationModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }

    res.status(200).json({ success: true, message: "Education deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error deleting education",
      details: err.message,
    });
  }
};

// Create Experience
export const createExperience = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      description,
      startDate,
      endDate,
      isPresent,
    } = req.body;

    if (!jobTitle || !companyName || !description || !startDate) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields: designation, companyName, description, startDate",
      });
    }

    if (!isPresent && !endDate) {
      return res.status(400).json({
        success: false,
        message: "End date is required if not currently working",
      });
    }

    const experience = new experienceModel({
      jobTitle,
      companyName,
      description,
      startDate,
      endDate,
      isPresent,
    });
    await experience.save();

    res
      .status(201)
      .json({ success: true, message: "Experience created", experience });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error creating experience",
      details: err.message,
    });
  }
};

// Get Experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, experiences });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching experiences",
      details: err.message,
    });
  }
};

// Update Experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobTitle,
      companyName,
      description,
      startDate,
      endDate,
      isPresent,
    } = req.body;

    const existing = await experienceModel.findById(id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    const updated = await experienceModel.findByIdAndUpdate(
      id,
      { jobTitle, companyName, description, startDate, endDate, isPresent },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Experience updated",
      experience: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error updating experience",
      details: err.message,
    });
  }
};

// delete Experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await experienceModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    res.status(200).json({ success: true, message: "Experience deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error deleting experience",
      details: err.message,
    });
  }
};

// create Technology
export const createTechnology = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file;

    if (!name || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, description, and logo image.",
      });
    }

    const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
      folder: "technologies",
    });

    const newTech = new technologyModel({
      name,
      description,
      imageUrl: cloudinaryUpload.secure_url,
    });

    await newTech.save();

    res.status(201).json({
      success: true,
      message: "Technology added",
      technology: newTech,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error creating technology",
      details: err.message,
    });
  }
};

// get Technologies
export const getTechnologies = async (req, res) => {
  try {
    const technologies = await technologyModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, technologies });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching technologies",
      details: err.message,
    });
  }
};

// update Technology
export const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    const existing = await technologyModel.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (file) {
      const publicId = getPublicIdFromUrl(existing.imageUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);

      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "technology",
      });

      existing.imageUrl = upload.secure_url;
    }

    existing.name = name || existing.name;
    existing.description = description || existing.description;

    await existing.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      technology: existing,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error updating",
      error: err.message,
    });
  }
};

// delete Technology
export const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const tech = await technologyModel.findByIdAndDelete(id);

    if (!tech) {
      return res
        .status(404)
        .json({ success: false, message: "Technology not found" });
    }

    if (tech?.imageUrl) {
      const publicId = getPublicIdFromUrl(tech.imageUrl);
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ success: true, message: "Technology deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting technology",
      details: error.message,
    });
  }
};
