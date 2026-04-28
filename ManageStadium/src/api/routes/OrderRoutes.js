import express from "express";
import { getBookedSlots, createOrderController } from "../controllers/orderController.js";

const router = express.Router();

router.get("/booked-slots", getBookedSlots);
router.post("/", createOrderController);

export default router;