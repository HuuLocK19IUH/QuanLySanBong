import express from "express";
import { getNotificationsByUserId, markNotificationAsRead } from "../controllers/NotificationController.js";

const router = express.Router();

router.get("/user/:userId", getNotificationsByUserId);
router.put("/:id/read", markNotificationAsRead);

export default router;
