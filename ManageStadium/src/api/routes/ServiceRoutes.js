import express from "express";
import { getServicesController } from "../controllers/ServiceController.js";

const router = express.Router();

/**
 * GET /api/services
 * Lấy danh sách service
 */
router.get("/", getServicesController);

export default router;