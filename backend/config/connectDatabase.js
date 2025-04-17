import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () => {
  try { 
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.error("❌ Unable to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
