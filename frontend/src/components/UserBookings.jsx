import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserBookings.css";

export default function UserBookings() {
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const userPhone = localStorage.getItem("userPhone");
    const navigate = useNavigate();

    // ── LIVE & LOCAL DYNAMIC SERVER LINK (FIXED) ──
    const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        if (!userPhone) {
            alert("Please log in to review your system booking history database logs.");
            navigate("/");
            return;
        }

        const fetchMyHistoryLogs = async () => {
            try {
                const targetUrl = `${BACKEND_URL}/api/bookings/my-bookings/${userPhone.trim()}`;
                console.log("Fetching history from clean URL:", targetUrl);

                const response = await fetch(targetUrl);

                // Strict validation handling 
                if (!response.ok) {
                    throw new Error(`Server returned error status code: ${response.status}`);
                }

                const data = await response.json();
                console.log("Raw API Response Data:", data);

                if (data && data.bookings) {
                    setMyBookings(data.bookings);
                } else if (Array.isArray(data)) {
                    setMyBookings(data);
                } else {
                    setMyBookings([]);
                }

            } catch (error) {
                console.error("Historical trace engine execution failure:", error);
                alert("Server execution timed out. Unable to parse backend records.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyHistoryLogs();
    }, [userPhone, navigate, BACKEND_URL]);

    if (loading) {
        return <div className="usb-loading-container">Compiling Personal Booking History Logs...</div>;
    }

    return (
        <div className="usb-page-wrapper">
            <h2 className="usb-main-heading">My Cleaning History Records</h2>
            <p className="usb-sub-tagline">Track all your current and historical operational slots details with Safai Sewa.</p>

            {myBookings && myBookings.length > 0 ? (
                <div className="usb-logs-stack">
                    {myBookings.map((b, index) => (
                        <div key={b._id || index} className="usb-booking-card-item">
                            <div className="usb-card-left-node">
                                <h4 className="usb-service-title">{b.serviceName}</h4>
                                <p className="usb-meta-line">
                                    <i className="fa-solid fa-calendar-day"></i> Allocation Date Target: <strong>{b.date}</strong>
                                </p>
                                <p className="usb-meta-line">
                                    <i className="fa-solid fa-clock"></i> Time Allocated Slot: <strong>{b.timeSlot}</strong>
                                </p>
                                <p className="usb-meta-line usb-address-field">
                                    <i className="fa-solid fa-location-dot"></i> Location: {b.address}
                                </p>
                            </div>
                            <div className="usb-card-right-node">
                                <div className="usb-price-highlight">₹{b.price}</div>
                                <span className={`usb-status-badge status-${b.status?.toLowerCase() || 'pending'}`}>
                                    {b.status || "Pending"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="usb-empty-state-card">
                    <p className="usb-empty-text">You haven't scheduled any service booking appointments yet with Safai Sewa.</p>
                    <button onClick={() => navigate("/book-now")} className="usb-btn-redirect">Book Your First Service Now</button>
                </div>
            )}
        </div>
    );
}