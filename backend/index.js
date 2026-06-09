import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import Booking from "./models/Booking.js"; // Explicitly imported for debug route

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());

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
    res.send("Safai Sewa Local Development API Server Live Matrix.");
});

app.listen(PORT, () => {
    console.log(`Server structural application initialized on local port endpoint: ${PORT}`);
});