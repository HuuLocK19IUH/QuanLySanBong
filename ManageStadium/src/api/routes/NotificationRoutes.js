import express from "express";
import { getNotificationsByUser } from "../controllers/NotificationController.js";

const router = express.Router();

router.get("/user/:user_id", getNotificationsByUser);

export default router;
