import express from "express";
import { getBookedSlots, createOrderController, getOrdersByUser } from "../controllers/orderController.js";

const router = express.Router();

router.get("/booked-slots", getBookedSlots);
router.post("/", createOrderController);
router.get("/user/:id_user", getOrdersByUser);

export default router;