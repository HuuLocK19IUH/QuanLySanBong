import express from "express";
import { getBookedSlots } from "../controllers/orderController.js";

const router = express.Router();

router.get("/booked-slots", getBookedSlots);

export default router;