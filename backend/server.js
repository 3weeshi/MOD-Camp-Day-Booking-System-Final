import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tentRoutes from "./routes/tentRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
mongoose .connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));   
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "MOD Camp Booking System API is running" }));
app.use("/api/tents", tentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.get("/api/test-db", async (req, res) => {
        const result = await mongoose.connection.db.collection("test").insertOne({ 
            message: "MongoDB is connected and working!",
            createdAt: new Date()});
        res.json({ message: "Saved to MongoDB", result });
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
