import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id_user: { type: String, unique: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    date_of_birth: Date,
    gender: String,
    avatar: String,
    date_created: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);