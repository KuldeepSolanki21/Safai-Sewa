import { useState } from "react";
import "../styles/ContactSection.css";

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // ── 🧠 DYNAMIC ENVIRONMENT PROXY URL CHECK ──
    const BACKEND_URL = window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://safai-sewa.onrender.com";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSent(true);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setSent(false), 4000);
            } else {
                alert(data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Contact submit error:", error);
            alert("Connection error. Please check server state integration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">

                {/* Left Side: Find Us Content Grid */}
                <div className="contact-left">
                    <h2 className="find-heading">Find Us</h2>
                    <div className="info-card">
                        <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                        <div className="info-text">
                            <h4>Call Us</h4>
                            <p>+91 90162 91487</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                        <div className="info-text">
                            <h4>Email Now</h4>
                            <p>SafaiSewa@gmail.com</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                        <div className="info-text">
                            <h4>Address</h4>
                            <p>123, Matawadi, Surat, Gujarat, India</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form View */}
                <div className="contact-right">
                    <p className="form-label">Contact Info</p>
                    <h2 className="form-heading">Keep In Touch</h2>
                    <p className="form-subtext">
                        We prioritize responding to your inquiries promptly to ensure you
                        receive the assistance you need in a timely manner.
                    </p>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="form-input form-textarea"
                        />
                        <button type="submit" className="form-btn" disabled={loading}>
                            {sent ? "✔ Message Sent!" : loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}