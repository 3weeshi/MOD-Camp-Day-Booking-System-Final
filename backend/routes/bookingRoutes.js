import express from "express";
import { createBooking, getBookings, updateBooking, updateBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.patch("/:id", updateBooking);
router.patch("/:id/status", updateBookingStatus);

export default router;
