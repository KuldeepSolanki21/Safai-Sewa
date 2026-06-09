import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import LoginLog from "../models/LoginLog.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. Send OTP & Pre-Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All sign up data parameters are required." });
        }

        let user = await User.findOne({ email: email.toLowerCase() });
        if (user && user.isVerified) {
            return res.status(400).json({ message: "Email is already registered and verified." });
        }

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 Minutes Valid

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const lowerEmail = email.toLowerCase();
        const assignedRole = (lowerEmail === "solankikuldeep2108@gmail.com") ? "admin" : "customer";

        if (user) {
            user.name = name;
            user.phone = phone;
            user.password = hashedPassword;
            user.otp = generatedOtp;
            user.otpExpires = otpExpiryTime;
            user.role = assignedRole;
            await user.save();
        } else {
            user = new User({
                name,
                email: lowerEmail,
                phone,
                password: hashedPassword,
                otp: generatedOtp,
                otpExpires: otpExpiryTime,
                role: assignedRole,
                isVerified: false
            });
            await user.save();
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: lowerEmail,
            subject: 'Safai Sewa Account Verification Security Code',
            text: `Hello ${name},\n\nYour 6-digit account verification code is: ${generatedOtp}\n\nThis code will expire in 10 minutes.`
        };

        // ── 🛡️ BULLETPROOF CLOUD SMTP TRANSPORTER (UPDATED FOR RENDER) ──
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // TLS secure handshakes ke liye hamesha false rahega
                pool: true,    // Parallel verification stream requests handle karne ke liye pool active
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    // ⚠️ Crucial for cloud server deployment (Render's US IP network checks filter bypass)
                    rejectUnauthorized: false
                }
            });

            await transporter.sendMail(mailOptions);
            console.log(`✔ OTP sent successfully via email to: ${lowerEmail}`);
        } catch (mailError) {
            console.log("\n----------------------------------------------------------------");
            console.log("⚠️ NODEMAILER DELIVERY FAILED (Check your Render Dashboard Environment configuration)");
            console.log(`🔥 [LOCAL TERMINAL BACKUP] USER OTP IS: ${generatedOtp}`);
            console.log(`❌ SMTP System Log: ${mailError.message}`);
            console.log("----------------------------------------------------------------\n");
        }

        // Always returning 200 so frontend can safely prompt the OTP verification layout
        return res.status(200).json({
            message: "Verification OTP code successfully generated."
        });

    } catch (error) {
        console.error("💥 Core Server Registration Crash Logs:", error);
        return res.status(500).json({ message: "Server encountered an operational failure during signup initialization.", error: error.message });
    }
});

// 2. Verify OTP Authentication
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User account context reference missing." });
        }

        if (!user.otp || user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ message: "The verification security code is invalid or expired." });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: "Account verified successfully! You can now log in safely." });

    } catch (error) {
        res.status(500).json({ message: "Server encountered verification routing failures.", error: error.message });
    }
});

// 3. User Login Access Processing
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "please enter valid user" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "Account authentication pending. Please verify via email OTP sequence first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "please enter valid user" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        const newLog = new LoginLog({
            name: user.name,
            email: user.email,
            role: user.role
        });
        await newLog.save();

        res.status(200).json({
            token,
            role: user.role,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server structural crash inside authentication engine processing.", error: error.message });
    }
});

// 4. Admin API Endpoint: Fetch All Login History Audit Trails
router.get("/login-logs", verifyAdmin, async (req, res) => {
    try {
        const logs = await LoginLog.find().sort({ loginTime: -1 });
        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: "Failed to download audit logs data registry mapping.", error: error.message });
    }
});

export default router;