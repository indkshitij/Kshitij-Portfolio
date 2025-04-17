import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/connectDatabase.js";
import cookieParser from "cookie-parser";
// Configuration
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
connectDatabase();

// CORS Setup
const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true,
};
app.use(cors(corsOptions));

import adminRouter from "./routes/adminRoutes.js";
app.use("/api", adminRouter);
import userRouter from "./routes/userRoutes.js";
app.use("/api/user", userRouter);

// Server Invoke
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
