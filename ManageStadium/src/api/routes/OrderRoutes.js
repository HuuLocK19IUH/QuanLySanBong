import express from "express";
import { getBookedSlots, createOrderController, getOrdersByUser } from "../controllers/orderController.js";

const router = express.Router();

router.get("/booked-slots", getBookedSlots);
router.get("/", getOrdersByUser);
router.post("/", createOrderController);

export default router;