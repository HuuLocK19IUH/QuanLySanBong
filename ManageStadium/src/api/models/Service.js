import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceSchema = new Schema(
    {
        service_id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number, 
            required: true,
            min: 0,
        },
    },
    {
        collection: "services",
        timestamps: false,
    }
);

export default model("Service", serviceSchema);