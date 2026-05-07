import express from "express";
import {
    getSportFields,
    getSportFieldById,
    updateSportField,
    deleteSportField,
    getSportFieldBySF_Id,
    getUniqueKeywords
} from "../controllers/SportfieldController.js";

const router = express.Router();

router.get("/", getSportFields);
router.get("/keywords", getUniqueKeywords);

router.get("/:id", getSportFieldById);
router.get("/code/:id", getSportFieldBySF_Id);

router.put("/:id", updateSportField);
router.delete("/:id", deleteSportField);

export default router;