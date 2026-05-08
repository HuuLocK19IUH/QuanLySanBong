import express from "express";
import { getBookedSlots, createOrderController, getOrdersByUser, getAllOrdersController, updateOrderStatusController } from "../controllers/orderController.js";

const router = express.Router();

router.get("/booked-slots", getBookedSlots);
router.get("/all", getAllOrdersController);
router.get("/", getOrdersByUser);
router.post("/", createOrderController);
router.put("/:id/status", updateOrderStatusController);

export default router;