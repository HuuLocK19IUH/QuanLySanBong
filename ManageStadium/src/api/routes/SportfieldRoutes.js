import express from "express";
import {
    getSportFields,
    getSportFieldById,
    updateSportField,
    deleteSportField
} from "../controllers/SportfieldController.js";

const router = express.Router();

router.get("/", getSportFields);
router.get("/:id", getSportFieldById);
router.put("/:id", updateSportField);
router.delete("/:id", deleteSportField);

export default router;