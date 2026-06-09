import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { servicesData } from "../Data/servicesdata";
import "../styles/ServiceDetail.css";

import OurProcess from "./OurProcess";
import WhyChooseUs from "./WhyChooseUs";
import ContactSection from "./ContactSection";

export default function ServiceDetail() {
    const { serviceId } = useParams();
    const service = servicesData[serviceId];
    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState({
        selectedService: serviceId || "kitchen-cleaning",
        fullName: "",
        phone: "",
        date: "",
        timeSlot: "",
        propertySize: "1 BHK",
        address: ""
    });

    // ── 🧠 DYNAMIC RUNTIME CHECK (NO ENVIRONMENT VARIABLES REQUIRED) ──
    const BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://safai-sewa.onrender.com";

    const currentHoursList = service?.hoursOptions || [2, 3, 4];
    const [selectedHours, setSelectedHours] = useState(currentHoursList[0]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [todayDate, setTodayDate] = useState("");

    // Calculate current date constraint window
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        setTodayDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    // Dynamic dynamic pricing compiler engine
    useEffect(() => {
        if (service) {
            const basePrice = service.basePrice || 499;
            const baseHours = service.hoursOptions ? service.hoursOptions[0] : 2;
            const extraHours = selectedHours - baseHours;

            const hourMultiplier = serviceId.includes("server") || serviceId.includes("showroom") ? 400 : 250;

            const calculatedTotal = basePrice + (extraHours > 0 ? extraHours * hourMultiplier : 0);
            setFinalPrice(Math.round(calculatedTotal));
        }
    }, [serviceId, selectedHours, service]);

    // Handle route transitions reset parameters context
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsSubmitted(false);
        if (serviceId && servicesData[serviceId]) {
            setBookingData((prev) => ({ ...prev, selectedService: serviceId }));
            setSelectedHours(servicesData[serviceId].hoursOptions[0]);
        }
    }, [serviceId]);

    if (!service) {
        return (
            <div className="error-container">
                <h2>Service Not Found</h2>
                <p>Sorry, the cleaning module you are trying to access does not exist.</p>
                <Link to="/" className="back-home-btn">Back to Home</Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const numbersOnly = value.replace(/\D/g, "");
            if (numbersOnly.length <= 10) {
                setBookingData({ ...bookingData, phone: numbersOnly });
            }
            return;
        }

        setBookingData({ ...bookingData, [name]: value });

        if (name === "selectedService" && value) {
            navigate(`/service/${value}`);
        }
    };

    const getActiveCategory = () => {
        const fullHome = ["kitchen-cleaning", "window-wiping", "sofa-cleaning", "washroom-sanitization"];
        const farmhouse = ["pool-deck", "terrace-wash", "lawn-cleaning", "party-clean"];
        const office = ["workstation-dusting", "server-room", "conference-room", "carpet-shampooing"];
        const commercial = ["retail-shop", "restaurant-degreasing", "floor-scrubbing", "showroom-cleaning"];

        if (fullHome.includes(serviceId)) return "FULL_HOME";
        if (fullHome.includes(serviceId)) return "FULL_HOME";
        if (farmhouse.includes(serviceId)) return "FARMHOUSE";
        if (office.includes(serviceId)) return "OFFICE";
        if (commercial.includes(serviceId)) return "COMMERCIAL";
        return "ALL";
    };

    const activeCategory = getActiveCategory();

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (bookingData.phone.length !== 10) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        const getCategoryString = () => {
            const catMap = {
                "FULL_HOME": "Full Home Cleaning",
                "FARMHOUSE": "Luxury Farmhouse Cleaning",
                "OFFICE": "Office Workspace Cleaning",
                "COMMERCIAL": "Commercial & Shop Cleaning"
            };
            return catMap[activeCategory] || "Full Home Cleaning";
        };

        const selectedOptionText = e.target.elements.selectedService.options[e.target.elements.selectedService.selectedIndex].text;

        try {
            const response = await fetch(`${BACKEND_URL}/api/bookings/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: bookingData.fullName,
                    phone: bookingData.phone,
                    category: getCategoryString(),
                    serviceName: selectedOptionText,
                    propertySize: bookingData.propertySize,
                    hours: Number(selectedHours),
                    price: Number(finalPrice),
                    date: bookingData.date,
                    timeSlot: bookingData.timeSlot,
                    address: bookingData.address
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert(data.message || "Failed to submit booking application.");
            }
        } catch (error) {
            console.error("Service submission database dispatch error:", error);
            alert("Server down. Please check backend environment logs connection execution state.");
        }
    };

    const bannerBg = service.images && service.images.length > 0 ? service.images[0] : "";

    return (
        <>
            <div className="service-detail-page">
                <div
                    className="service-banner animated-banner"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(26, 67, 20, 0.85), rgba(46, 125, 50, 0.75)), url(${bannerBg})`
                    }}
                >
                    <div className="banner-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                    </div>
                    <div className="banner-content">
                        <h1 className="animate-pop">{service.title}</h1>
                        <p className="tagline animate-fade-up">{service.tagline}</p>
                        <div className="banner-badge animate-fade-up">
                            <i className="fa-solid fa-sparkles"></i> Premium Safai Service
                        </div>
                    </div>
                </div>

                <div className="service-content-container">
                    <div className="main-info">
                        {service.images && service.images.length > 0 && (
                            <div className="service-image-gallery">
                                <div className="main-gallery-img">
                                    <img src={service.images[0]} alt={`${service.title} 1`} />
                                </div>
                                <div className="sub-gallery-images">
                                    {service.images.slice(1, 3).map((img, idx) => (
                                        <img key={idx} src={img} alt={`${service.title} ${idx + 2}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="service-text-block">
                            <h2>About the Service</h2>
                            <p className="description">{service.description}</p>

                            <h3>What's Included in This Package:</h3>
                            <ul className="features-list">
                                {service.features.map((feature, index) => (
                                    <li key={index}>
                                        <i className="fa-solid fa-circle-check check-icon"></i> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="booking-sidebar">
                        <div className="booking-form-card">
                            <h3>Book Appointment</h3>
                            <p className="form-helper-text">Fill details to schedule your cleaning slot</p>

                            <div className="sd-checkout-mini-receipt">
                                <div className="sd-receipt-line">
                                    <span>Duration:</span>
                                    <strong>{selectedHours} Hours</strong>
                                </div>
                                <div className="sd-receipt-line sd-total-highlight">
                                    <span>Total Price:</span>
                                    <strong>₹{finalPrice}</strong>
                                </div>
                            </div>

                            <hr className="sd-dashed-divider" />

                            {isSubmitted ? (
                                <div className="booking-success-msg">
                                    <i className="fa-solid fa-circle-check success-icon-big"></i>
                                    <h4>Booking Requested!</h4>
                                    <p>We have safely received your request for <strong>{service.title}</strong>. Our verification team will ring you up soon to confirm your details.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBookingSubmit} className="sidebar-booking-form">
                                    <div className="form-group-sidebar">
                                        <label>Select Service</label>
                                        <select
                                            name="selectedService"
                                            value={bookingData.selectedService}
                                            onChange={handleInputChange}
                                            className="service-select-dropdown"
                                            required
                                        >
                                            {activeCategory === "FULL_HOME" && (
                                                <optgroup label="FULL HOME CLEANING">
                                                    <option value="kitchen-cleaning">Kitchen Deep Cleaning</option>
                                                    <option value="window-wiping">Window & Glass Wiping</option>
                                                    <option value="sofa-cleaning">Bedroom & Sofa Clean</option>
                                                    <option value="washroom-sanitization">Washroom Sanitization</option>
                                                </optgroup>
                                            )}

                                            {activeCategory === "FARMHOUSE" && (
                                                <optgroup label="LUXURY FARMHOUSE CLEANING">
                                                    <option value="pool-deck">Swimming Pool Deck</option>
                                                    <option value="terrace-wash">Open Terrace Wash</option>
                                                    <option value="lawn-cleaning">Lawn Path Cleaning</option>
                                                    <option value="party-clean">Post-Party Deep Clean</option>
                                                </optgroup>
                                            )}

                                            {activeCategory === "OFFICE" && (
                                                <optgroup label="OFFICE WORKSPACE CLEANING">
                                                    <option value="workstation-dusting">Workstation Dusting</option>
                                                    <option value="server-room">Server Room Safety</option>
                                                    <option value="conference-room">Conference Room Care</option>
                                                    <option value="carpet-shampooing">Carpet Shampooing</option>
                                                </optgroup>
                                            )}

                                            {activeCategory === "COMMERCIAL" && (
                                                <optgroup label="COMMERCIAL & SHOP CLEANING">
                                                    <option value="retail-shop">Retail Shop Front</option>
                                                    <option value="restaurant-degreasing">Restaurant Kitchen Deep Degreasing</option>
                                                    <option value="floor-scrubbing">Floor Deep Scrubbing</option>
                                                    <option value="showroom-cleaning">Showroom Deep Clean</option>
                                                </optgroup>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group-sidebar">
                                        <label>Select Duration (Hours)</label>
                                        <div className="sd-hours-btn-group">
                                            {currentHoursList.map((hour) => (
                                                <button
                                                    key={hour}
                                                    type="button"
                                                    className={`sd-hour-pill ${selectedHours === hour ? "active" : ""}`}
                                                    onClick={() => setSelectedHours(hour)}
                                                >
                                                    {hour} {hour === 1 ? "Hr" : "Hrs"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group-sidebar">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Your Name"
                                            value={bookingData.fullName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-row-sidebar">
                                        <div className="form-group-sidebar">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                maxLength="10"
                                                pattern="[0-9]{10}"
                                                placeholder="10-digit Phone"
                                                value={bookingData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group-sidebar">
                                            <label>Property Size / Scope</label>
                                            <select
                                                name="propertySize"
                                                value={bookingData.propertySize}
                                                onChange={handleInputChange}
                                            >
                                                <option value="1 BHK / Small Retail">1 BHK / Small Scope</option>
                                                <option value="2 BHK / Medium Area">2 BHK / Medium Area</option>
                                                <option value="3 BHK / Corporate Hall">3 BHK / Corporate Hall</option>
                                                <option value="4+ BHK / Luxury Showroom">4+ BHK / Big Showroom</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row-sidebar">
                                        <div className="form-group-sidebar">
                                            <label>Preferred Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                className="sd-dark-text-field"
                                                min={todayDate}
                                                value={bookingData.date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group-sidebar">
                                            <label>Preferred Slot</label>
                                            <select
                                                name="timeSlot"
                                                className="sd-dark-text-field"
                                                value={bookingData.timeSlot}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Slot</option>
                                                <option value="Morning (9:00 AM - 12:00 PM)">Morning (9AM-12PM)</option>
                                                <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12PM-3PM)</option>
                                                <option value="Evening (3:00 PM - 6:00 PM)">Evening (3PM-6PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group-sidebar">
                                        <label>Service Address</label>
                                        <textarea
                                            name="address"
                                            rows="2"
                                            placeholder="Enter complete street address details..."
                                            value={bookingData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="confirm-booking-btn">
                                        Confirm Appointment
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <OurProcess />
            <WhyChooseUs />
            <ContactSection />
        </>
    );
}