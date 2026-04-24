import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/stadiumManagedb");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

export default connectDB;