import mongoose from "mongoose";
import { getBookedTimeSlotsBySportFieldAndDate } from "./src/api/services/OrderService.js";

const runTest = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/stadiumManagedb");

        const id_sportfield = "SF002";
        const date = "2026-04-27";

        const result = await getBookedTimeSlotsBySportFieldAndDate(
            id_sportfield,
            date
        );

        console.log("Booked slots:");
        console.log(result);

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
};

runTest();