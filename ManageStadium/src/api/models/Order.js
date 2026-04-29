import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Subdocument cho services
const serviceSchema = new Schema(
    {
        service_id: {
            type: String,
            required: true,
        },
        service_name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
        },
        service_cost: {
            type: Number,
            required: true,
        },
    },
    { _id: false } // không cần _id cho từng service
);

const orderSchema = new Schema(
    {
        id_order: {
            type: String,
            required: true,
            unique: true,
        },
        id_user: {
            type: String,
            required: true,
        },
        id_sportfield: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: false,
        },
        start_hour: {
            type: Date,
            required: true,
        },
        end_hour: {
            type: Date,
            required: true,
        },
        total_hourly_cost: {
            type: Number,
            required: true,
        },
        services: [serviceSchema],

        total_order: {
            type: Number,
            required: true,
        },
        state: {
            type: String,
            enum: [
                "pending",
                "completed",
                "expired",
                "paid"
            ],
            default: "pending",
        },
        date_created: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "orders",
        timestamps: false,
    }
);

export default model("Order", orderSchema);