import express from "express";
import { getUsers, createUser, loginUser, updateUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/", updateUser);
export default router;