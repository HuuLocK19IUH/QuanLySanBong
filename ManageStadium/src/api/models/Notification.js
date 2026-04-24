import mongoose from "mongoose";

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        order_id: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["order_completed", "order_cancelled","order_expired"],
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        is_read: {
            type: Boolean,
            default: false,
        },

        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "notifications",
        timestamps: false,
    }
);

export default model("Notification", notificationSchema);