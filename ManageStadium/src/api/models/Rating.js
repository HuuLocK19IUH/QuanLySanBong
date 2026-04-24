import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ratingSchema = new Schema(
    {
        rating_id: {
            type: String,
            required: true,
            unique: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        sportfield_id: {
            type: String,
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            default: "",
        },
        star_rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        date_created: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "ratings",
        timestamps: false, 
    }
);

export default model("Rating", ratingSchema);