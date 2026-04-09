import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id_user: String,
    name: String,
    phone_number: String,
    password: String,
    date_of_birth: Date,
    gender: String,
    avatar_url: String,
    date_created: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "Users"
});

export default mongoose.model("User", userSchema);