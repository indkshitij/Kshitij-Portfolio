import express from "express";
import {
  contact,
  getAllProjects,
  getExperiences,
  getEducations,
  getTechnologies,
  getProfileInfo,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/contact", contact);
userRouter.get("/fetch-profile-info", getProfileInfo);
userRouter.get("/fetch-projects", getAllProjects);
userRouter.get("/fetch-experiences", getExperiences);
userRouter.get("/fetch-educations", getEducations);
userRouter.get("/fetch-technologies", getTechnologies);

export default userRouter;
