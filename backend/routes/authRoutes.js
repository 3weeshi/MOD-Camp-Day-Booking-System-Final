import express from "express";
import { login, register, staffLogin } from "../controllers/authController.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/staff-login", staffLogin);
export default router;
