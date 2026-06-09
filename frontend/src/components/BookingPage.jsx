import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bookingServices } from "../Data/bookingservicesData";
import "../styles/BookingPage.css";

export default function BookingPage() {
    const location = useLocation();

    const [selectedService, setSelectedService] = useState(bookingServices[0]);
    const [selectedHours, setSelectedHours] = useState(bookingServices[0].hoursOptions[0]);
    const [finalPrice, setFinalPrice] = useState(bookingServices[0].basePrice);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        timeSlot: "",
        address: ""
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [todayDate, setTodayDate] = useState("");

    // ── LOCALHOST ONLY PC DEVELOPMENT SERVER LINK ──
    const BACKEND_URL = "http://localhost:5000";

    // Auto-fill logged in user info
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedPhone = localStorage.getItem("userPhone");
        if (storedName || storedPhone) {
            setFormData(prev => ({
                ...prev,
                name: storedName || "",
                phone: storedPhone || ""
            }));
        }
    }, []);

    // Calculate current date
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        setTodayDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    // Slider redirect query synchronization
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const serviceParam = params.get("service");

        if (serviceParam) {
            const matchedService = bookingServices.find(s => s.id === serviceParam);
            if (matchedService) {
                setSelectedService(matchedService);
                setSelectedHours(matchedService.hoursOptions[0]);
                setIsSuccess(false); // Reset success screen view state context
            }
        }
    }, [location]);

    // Dynamic price calculation
    useEffect(() => {
        if (selectedService) {
            const baseHours = selectedService.hoursOptions[0];
            const extraHours = selectedHours - baseHours;
            const hourMultiplier = selectedService.id === "commercial-cleaning" ? 400 : 250;

            const calculatedTotal = selectedService.basePrice + (extraHours > 0 ? extraHours * hourMultiplier : 0);
            setFinalPrice(Math.round(calculatedTotal));
        }
    }, [selectedService, selectedHours]);

    const handleServiceChange = (service) => {
        setSelectedService(service);
        setSelectedHours(service.hoursOptions[0]);
        setIsSuccess(false); // 💥 FIXED: Reset state immediately when a user switches cleaning layout models
    };

    const handleInputChange = (e) => {
        if (e.target.name === "phone") {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
                setFormData({ ...formData, phone: value });
            }
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phone.length !== 10) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/bookings/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    category: selectedService.name,
                    serviceName: selectedService.name,
                    hours: Number(selectedHours),
                    price: Number(finalPrice),
                    date: formData.date,
                    timeSlot: formData.timeSlot,
                    address: formData.address
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert(data.message || "An error occurred while submitting the booking form request.");
            }
        } catch (error) {
            console.error("Booking verification submission failure:", error);
            alert("Server connection failed. Please ensure the backend server layer is live.");
        }
    };

    return (
        <div className="bk-page-wrapper">
            <div className="bk-hero-banner">
                <div className="bk-hero-content">
                    <h1>Book Your Cleaning Slot</h1>
                    <p>Configure your customized hourly packages with zero hidden charges.</p>
                </div>
            </div>

            <div className="bk-main-container">
                {/* LEFT COLUMN */}
                <div className="bk-info-column">
                    <h3 className="bk-section-title">1. Select a Cleaning Service</h3>
                    <div className="bk-services-grid">
                        {bookingServices.map((service) => (
                            <div
                                key={service.id}
                                className={`bk-service-card ${selectedService.id === service.id ? "active" : ""}`}
                                onClick={() => handleServiceChange(service)}
                            >
                                <div className="bk-card-icon">
                                    <i className={`fa-solid ${service.icon}`}></i>
                                </div>
                                <h4>{service.name}</h4>
                                <p className="bk-card-price">Starts from ₹{service.basePrice}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bk-details-display-box">
                        <h3>Included Facilities inside {selectedService.name}:</h3>
                        <ul className="bk-facilities-list">
                            {selectedService.facilities.map((fac, idx) => (
                                <li key={idx}>
                                    <i className="fa-solid fa-circle-check"></i> {fac}
                                </li>
                            ))}
                        </ul>

                        <div className="bk-hours-configurator">
                            <h4>Select Duration (Hours):</h4>
                            <div className="bk-hours-options-row">
                                {selectedService.hoursOptions.map((hour) => (
                                    <button
                                        key={hour}
                                        type="button"
                                        className={`bk-hour-btn ${selectedHours === hour ? "active" : ""}`}
                                        onClick={() => setSelectedHours(hour)}
                                    >
                                        {hour} {hour === 1 ? "Hour" : "Hours"}
                                    </button>
                                ))}
                            </div>
                            <p className="bk-hours-helper-text">
                                *Prices will adjust dynamically depending upon the duration of your custom selections.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="bk-form-column">
                    <div className="bk-checkout-sticky-card">
                        <h3>Booking Checkout</h3>
                        <p className="bk-checkout-helper">Provide your details to securely lock your automated slot.</p>
                        <hr className="bk-divider" />

                        <div className="bk-receipt-row">
                            <span>Selected Service:</span>
                            <strong>{selectedService.name}</strong>
                        </div>
                        <div className="bk-receipt-row">
                            <span>Duration Allocated:</span>
                            <strong>{selectedHours} Hours</strong>
                        </div>
                        <div className="bk-receipt-row total-row">
                            <span>Total Payable Amount:</span>
                            <strong className="bk-grand-price">₹{finalPrice}</strong>
                        </div>

                        <hr className="bk-divider" />

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className="bk-checkout-form">
                                <div className="bk-input-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" required placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="bk-input-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        placeholder="Enter 10-digit mobile number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="bk-form-grid-2">
                                    <div className="bk-input-group">
                                        <label>Preferred Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="bk-fix-input-text"
                                            required
                                            min={todayDate}
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="bk-input-group">
                                        <label>Preferred Slot</label>
                                        <select
                                            name="timeSlot"
                                            className="bk-fix-input-text"
                                            required
                                            value={formData.timeSlot}
                                            onChange={handleInputChange}
                                            style={{ height: '44px', cursor: 'pointer' }}
                                        >
                                            <option value="">Select a Slot</option>
                                            <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                                            <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                                            <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bk-input-group">
                                    <label>Complete Address</label>
                                    <textarea name="address" rows="3" required placeholder="Flat / House No, Building, Area details" value={formData.address} onChange={handleInputChange}></textarea>
                                </div>

                                <button type="submit" className="bk-submit-btn">
                                    Confirm Live Booking
                                </button>
                            </form>
                        ) : (
                            <div className="bk-success-animation">
                                <i className="fa-solid fa-circle-check success-icon"></i>
                                <h4>Booking Requested Successfully!</h4>
                                <p>Our verification backend system has locked this request. Our team will trigger a verification call on your mobile shortly.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}