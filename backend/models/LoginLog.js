import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    loginTime: { type: Date, default: Date.now }
});

const LoginLog = mongoose.model("LoginLog", loginLogSchema);
export default LoginLog;