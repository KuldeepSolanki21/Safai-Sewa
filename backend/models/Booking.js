import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    serviceName: { type: String, required: true },
    hours: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    address: { type: String, required: true },
    // Injected to support both multi-page forms into one single database table
    propertySize: { type: String, default: "N/A" }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;