import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Handle incoming contact form submissions
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All input fields are strictly required." });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(200).json({ message: "Your message has been logged successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server encountered an error processing the contact data.", error: error.message });
    }
});

export default router;