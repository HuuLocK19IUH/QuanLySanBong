import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// đảm bảo folder tồn tại
const uploadPath = "public/uploads";
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("avatar"), (req, res) => {
    try {
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.json({
            url: `/uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
});

export default router;