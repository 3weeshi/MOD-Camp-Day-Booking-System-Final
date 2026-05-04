import express from "express";
import { getTentById, getTents } from "../controllers/tentController.js";
const router = express.Router();
router.get("/", getTents);
router.get("/:id", getTentById);
export default router;