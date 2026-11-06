import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import Booking from "./models/Booking.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB without crashing the server if offline
connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check endpoint for instant diagnostics (Render / UptimeRobot / Browser)
app.get("/api/health", (req, res) => {
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    const dbState = mongoose.connection.readyState;
    res.status(200).json({
        status: "ok",
        server: "online",
        databaseState: states[dbState] || "unknown",
        isDatabaseConnected: dbState === 1,
        mongoUriConfigured: Boolean(process.env.MONGO_URI),
        timestamp: new Date().toISOString()
    });
});

// Middleware to check database connection for /api requests
app.use("/api", (req, res, next) => {
    // Skip health check
    if (req.path === "/health") return next();

    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            message: "Database connecting or unavailable. Please verify MONGO_URI in Render dashboard and allow 0.0.0.0/0 in MongoDB Atlas.",
            isDatabaseConnected: false
        });
    }
    next();
});

// Main Routing Layers
app.use("/api/users", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/bookings", bookingRoutes);

// DIRECT BACKUP ROUTE: Agar router nesting fail ho rahi ho toh ye direct hit hoga
app.get("/api/bookings/my-bookings/:phone", async (req, res) => {
    try {
        const userPhone = req.params.phone.trim();
        console.log("🔥 [INDEX DIRECT ROUTE] Request received for user phone:", userPhone);

        const bookings = await Booking.find({ phone: userPhone }).sort({ createdAt: -1 });
        console.log(`[DATABASE MATCH] Found ${bookings.length} records for user.`);

        return res.status(200).json({ bookings });
    } catch (error) {
        console.error("Direct route system failure:", error);
        return res.status(500).json({ message: "Server route fallback failure", error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("Safai Sewa API Server Live Matrix.");
});

app.listen(PORT, () => {
    console.log(`Server structural application initialized on port endpoint: ${PORT}`);
});
