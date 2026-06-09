import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loginLogs, setLoginLogs] = useState([]);
    const [activeTab, setActiveTab] = useState("bookings");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    // ── 🧠 DYNAMIC RUNTIME CHECK (NO ENVIRONMENT VARIABLES REQUIRED) ──
    const BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://safai-sewa.onrender.com";

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("userRole");

        if (!token || userRole !== "admin") {
            setIsAuthorized(false);
            setLoading(false);
            return;
        }

        setIsAuthorized(true);

        const fetchDashboardData = async () => {
            try {
                // 1. Fetching all system service bookings
                const bookingResponse = await fetch(`${BACKEND_URL}/api/bookings/all`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const bookingData = await bookingResponse.json();
                if (bookingResponse.ok) {
                    setBookings(bookingData.bookings || []);
                }

                // 2. Fetching all system real-time user login audit trails
                const logsResponse = await fetch(`${BACKEND_URL}/api/users/login-logs`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const logsData = await logsResponse.json();
                if (logsResponse.ok) {
                    setLoginLogs(logsData.logs || []);
                }

            } catch (error) {
                console.error("Dashboard engine critical fetch network failure:", error);
                alert("Server connection error while downloading records metadata layers.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [BACKEND_URL]);

    if (loading) {
        return <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif", fontWeight: "500" }}>Loading Secure Management Shell Logs...</div>;
    }

    if (!isAuthorized) {
        return (
            <div style={{ padding: "60px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
                <h2 style={{ color: "#dc3545" }}>⚠️ Access Denied</h2>
                <p style={{ color: "#666", margin: "10px 0 20px" }}>You do not have authorization to view this administrative interface panel.</p>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        background: "#2e7d32", color: "#fff", border: "none",
                        padding: "10px 24px", borderRadius: "50px", cursor: "pointer", fontWeight: "600"
                    }}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const filteredBookings = bookings.filter((b) =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.phone?.includes(searchTerm)
    );

    const filteredLoginLogs = loginLogs.filter((log) =>
        log.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h2 style={{ color: "#2e7d32", marginBottom: "5px" }}>Safai Sewa - Control Center Shell</h2>
            <p style={{ color: "#666", marginBottom: "25px" }}>Administrative Workspace Management Node</p>

            {/* Navigation Tab Controllers */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "25px", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
                <button
                    onClick={() => { setActiveTab("bookings"); setSearchTerm(""); }}
                    style={{
                        background: activeTab === "bookings" ? "#2e7d32" : "none",
                        color: activeTab === "bookings" ? "#fff" : "#555",
                        border: activeTab === "bookings" ? "none" : "1px solid #ccc",
                        padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600"
                    }}
                >
                    📋 Booking Records ({bookings.length})
                </button>
                <button
                    onClick={() => { setActiveTab("logins"); setSearchTerm(""); }}
                    style={{
                        background: activeTab === "logins" ? "#1976d2" : "none",
                        color: activeTab === "logins" ? "#fff" : "#555",
                        border: activeTab === "logins" ? "none" : "1px solid #ccc",
                        padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600"
                    }}
                >
                    🔑 User Login History ({loginLogs.length})
                </button>
            </div>

            {/* Global Context Query Input Bar */}
            <input
                type="text"
                placeholder={activeTab === "bookings" ? "Search by Customer Name or Phone..." : "Search by Username or Account Email..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "100%", maxWidth: "400px", padding: "11px 15px", marginBottom: "25px",
                    borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", outline: "none"
                }}
            />

            {/* VIEW PANE 1: BOOKING MANAGEMENT GRID */}
            {activeTab === "bookings" && (
                <div style={{ overflowX: "auto", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", borderRadius: "8px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: "14px" }}>
                        <thead>
                            <tr style={{ background: "#2e7d32", color: "#fff", textAlign: "left" }}>
                                <th style={{ padding: "12px 15px" }}>Customer Name</th>
                                <th style={{ padding: "12px 15px" }}>Phone</th>
                                <th style={{ padding: "12px 15px" }}>Category Type</th>
                                <th style={{ padding: "12px 15px" }}>Allocated Sub-Service</th>
                                <th style={{ padding: "12px 15px" }}>Hours</th>
                                <th style={{ padding: "12px 15px" }}>Price</th>
                                <th style={{ padding: "12px 15px" }}>Date</th>
                                <th style={{ padding: "12px 15px" }}>Time Slot</th>
                                <th style={{ padding: "12px 15px" }}>Service Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((b, index) => (
                                    <tr key={b._id || index} style={{ borderBottom: "1px solid #eee", verticalAlign: "top" }}>
                                        <td style={{ padding: "12px 15px", fontWeight: "600", color: "#333" }}>{b.name}</td>
                                        <td style={{ padding: "12px 15px", color: "#555" }}>{b.phone}</td>
                                        <td style={{ padding: "12px 15px", color: "#666" }}>{b.category}</td>
                                        <td style={{ padding: "12px 15px", color: "#2e7d32", fontWeight: "500" }}>{b.serviceName}</td>
                                        <td style={{ padding: "12px 15px" }}>{b.hours} Hrs</td>
                                        <td style={{ padding: "12px 15px", fontWeight: "600" }}>₹{b.price}</td>
                                        <td style={{ padding: "12px 15px", color: "#444" }}>{b.date}</td>
                                        <td style={{ padding: "12px 15px", fontSize: "12px", color: "#777" }}>{b.timeSlot}</td>
                                        <td style={{ padding: "12px 15px", fontSize: "13px", color: "#555", maxWidth: "220px", wordWrap: "break-word" }}>{b.address}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" style={{ padding: "20px", textAlign: "center", color: "#999" }}>No booking match fields found inside the database repository.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VIEW PANE 2: AUDIT LOGS INTERFACES */}
            {activeTab === "logins" && (
                <div style={{ overflowX: "auto", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", borderRadius: "8px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: "14px" }}>
                        <thead>
                            <tr style={{ background: "#1976d2", color: "#fff", textAlign: "left" }}>
                                <th style={{ padding: "12px 15px" }}>System Log ID</th>
                                <th style={{ padding: "12px 15px" }}>User Profile Name</th>
                                <th style={{ padding: "12px 15px" }}>Account Email Address</th>
                                <th style={{ padding: "12px 15px" }}>System Role Status</th>
                                <th style={{ padding: "12px 15px" }}>Authentication Event Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLoginLogs.length > 0 ? (
                                filteredLoginLogs.map((log, index) => (
                                    <tr key={log._id || index} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "12px 15px", color: "#888", fontSize: "12px", fontFamily: "monospace" }}>{log._id}</td>
                                        <td style={{ padding: "12px 15px", fontWeight: "600", color: "#333" }}>{log.name}</td>
                                        <td style={{ padding: "12px 15px", color: "#1976d2", fontWeight: "500" }}>{log.email}</td>
                                        <td style={{ padding: "12px 15px" }}>
                                            <span style={{
                                                background: log.role === "admin" ? "#ffebee" : "#e8f5e9",
                                                color: log.role === "admin" ? "#c62828" : "#2e7d32",
                                                padding: "4px 10px", borderRadius: "50px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase"
                                            }}>
                                                {log.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 15px", color: "#555", fontWeight: "500" }}>
                                            {new Date(log.loginTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#999" }}>No systemic login authentication footprints recorded in runtime fields.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}