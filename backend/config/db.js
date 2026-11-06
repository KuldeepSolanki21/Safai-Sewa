import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("❌ Database Connection Error: MONGO_URI environment variable is missing!");
        return;
    }

    try {
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000 // Quick 5s timeout instead of hanging 30s
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // CRITICAL FIX: Do NOT call process.exit(1) on cloud host!
        // Calling process.exit(1) kills the Node process and puts Render in an infinite crash loop,
        // which causes net::ERR_CONNECTION_RESET on every frontend request.
    }
};

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Ensure MongoDB Atlas IP is whitelisted (0.0.0.0/0).");
});

export default connectDB;
