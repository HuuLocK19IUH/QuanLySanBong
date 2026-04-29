import express from "express";
import { getRatings, createRating } from "../controllers/RatingController.js";

const router = express.Router();

router.get("/", getRatings);
router.post("/", createRating);

export default router;
