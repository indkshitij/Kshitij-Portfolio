import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  adminLogin,
  updateProfileInfo,
  fetchProfileInfo,
  fetchMessages,
  deleteMessage,
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation,
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
  createTechnology,
  getTechnologies,
  updateTechnology,
  deleteTechnology,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";

const adminRouter = express.Router();

// Login
adminRouter.post("/admin-login", adminLogin);
// Messages
adminRouter.get("/fetch-messages", authUser, fetchMessages);
adminRouter.delete("/delete-message/:id", authUser, deleteMessage);
// Profile Info
adminRouter.put(
  "/update-profile-info",
  authUser,
  upload.single("image"),
  updateProfileInfo
);
adminRouter.get("/fetch-profile-info", authUser, fetchProfileInfo);
// Projects Route
adminRouter.post(
  "/create-project",
  authUser,
  upload.single("image"),
  createProject
);
adminRouter.get("/fetch-project", authUser, getAllProjects);
adminRouter.put(
  "/update-projects/:id",
  authUser,
  upload.single("image"),
  updateProject
);
adminRouter.delete("/delete-projects/:id", authUser, deleteProject);
// Education Route
adminRouter.post("/create-education", authUser, createEducation);
adminRouter.get("/fetch-education", authUser, getEducations);
adminRouter.put("/update-education/:id", authUser, updateEducation);
adminRouter.delete("/delete-education/:id", authUser, deleteEducation);
// Experience
adminRouter.post("/create-experience", authUser, createExperience);
adminRouter.get("/fetch-experience", authUser, getExperiences);
adminRouter.put("/update-experience/:id", authUser, updateExperience);
adminRouter.delete("/delete-experience/:id", authUser, deleteExperience);
// Technology Routes
adminRouter.post(
  "/create-technology",
  authUser,
  upload.single("image"),
  createTechnology
);
adminRouter.get("/fetch-technology", authUser, getTechnologies);
adminRouter.put(
  "/update-technology/:id",
  authUser,
  upload.single("image"),
  updateTechnology
);
adminRouter.delete("/delete-technology/:id", authUser, deleteTechnology);

export default adminRouter;
