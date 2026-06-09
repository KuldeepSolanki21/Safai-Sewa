import express from "express";
import Booking from "../models/Booking.js";
import { verifyAdmin } from "../middleware/authMiddleware.js"; // Protection lock layer

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { name, phone, category, serviceName, hours, price, date, timeSlot, address, propertySize } = req.body;

        if (!name || !phone || !category || !serviceName || !hours || !price || !date || !timeSlot || !address) {
            return res.status(400).json({ message: "All core order processing parameters are strictly required." });
        }

        const newBooking = new Booking({
            name,
            phone,
            category,
            serviceName,
            hours,
            price,
            date,
            timeSlot,
            address,
            propertySize: propertySize || "N/A"
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking requested successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server operational failure during booking registry instantiation.", error: error.message });
    }
});

//  ADMIN ONLY APIS ENDPOINT: FETCH ALL SYSTEM BOOKINGS DATA LAYERS
router.get("/all", verifyAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Failed to query system master bookings collection records.", error: error.message });
    }
});
router.get("/my-bookings/:phone", async (req, res) => {
    try {
        const userPhone = req.params.phone;

        // Sirf isi user ka data database se find karega
        const bookings = await Booking.find({ phone: userPhone }).sort({ createdAt: -1 });

        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching records", error: error.message });
    }
});

export default router;