import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="gs-footer-section">
            <div className="gs-footer-container">

                {/* Column 1: Logo & Brand Info */}
                <div className="gs-footer-col brand-info">
                    <Link to="/" className="gs-footer-logo">
                        <div className="gs-f-logo-icon">
                            <img src={logoImg} alt="Ghar Saathio" className="gs-f-logo-img" />
                        </div>
                        {/* FIXED: Header ki tarah Upar-Niche text alignment stack kiya */}
                        <div className="gs-f-logo-text-stack">
                            <div className="safai-logo">Safai</div>
                            <div className="sewa-logo">Sewa</div>
                        </div>
                    </Link>
                    <p className="gs-footer-desc">
                        Our cleaning service company is dedicated to providing high-quality cleaning services to our customers. We offer a range of services, from residential to commercial cleaning, all at an affordable price.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="gs-footer-col">
                    <h3 className="gs-footer-heading">Quick links</h3>
                    <ul className="gs-footer-links">
                        {/* FIXED: Router Link lagaya jo direct main home page par le jayega */}
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#about" onClick={(e) => e.preventDefault()}>About Us</a></li>
                        <li><Link to="/service/home-cleaning">Services</Link></li>
                        <li><a href="#blog" onClick={(e) => e.preventDefault()}>Blog</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>

                {/* Column 3: Opening Hours */}
                <div className="gs-footer-col">
                    <h3 className="gs-footer-heading">Opening Hours</h3>
                    <ul className="gs-footer-hours">
                        <li>
                            <span className="day">Monday - Friday</span>
                            <span className="time">9am - 8pm</span>
                        </li>
                        {/* FIXED: Weekend par ab closed nahi active timing dikhega */}
                        <li>
                            <span className="day">Saturday - Sunday</span>
                            <span className="time status-open">9am - 8pm</span>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Get The App */}
                <div className="gs-footer-col">
                    <h3 className="gs-footer-heading">Get The App</h3>
                    <div className="gs-footer-apps">
                        {/* App Store */}
                        <a href="#" className="gs-f-app-btn" aria-label="Download on the App Store">
                            <svg width="22" height="24" viewBox="0 0 814 1000" fill="white">
                                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49 192.5-49 30.8 0 134.2 2.6 198.4 99zM549.5 148.5c22.5-26.8 38.5-64.3 38.5-101.8 0-5.2-.6-10.4-1.3-14.9-36.4 1.3-79.2 24.4-104.8 54.7-20.1 22.5-39.5 60-39.5 98.1 0 5.8.6 11.6 1.3 16.9 2.6.6 5.8.6 8.4.6 32.6 0 73.8-22.5 97.4-53.6z" />
                            </svg>
                            <div className="gs-f-app-text">
                                <span className="gs-f-app-sub">Download on the</span>
                                <span className="gs-f-app-name">App Store</span>
                            </div>
                        </a>

                        {/* Google Play */}
                        <a href="#" className="gs-f-app-btn" aria-label="Get it on Google Play">
                            <svg width="24" height="24" viewBox="0 0 48 48">
                                <path fill="#4CAF50" d="M8 6.3v35.4l20-17.7z" />
                                <path fill="#FF5252" d="M8 6.3l20 17.7 5.6-5-19-10.8A3 3 0 008 6.3z" />
                                <path fill="#FFD740" d="M8 41.7a3 3 0 006.6 1.7l19-10.8-5.6-5z" />
                                <path fill="#448AFF" d="M33.6 19l-5.6 5 5.6 5 5.6-3.2a3 3 0 000-3.6z" />
                            </svg>
                            <div className="gs-f-app-text">
                                <span className="gs-f-app-sub">GET IT ON</span>
                                <span className="gs-f-app-name">Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Footer Line */}
            <div className="gs-footer-bottom">
                <div className="gs-footer-bottom-container">
                    <p className="gs-copyright">
                        © 2026 SafaiSewa. All rights reserved.
                    </p>
                    <div className="gs-footer-socials">
                        <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" aria-label="Dribbble"><i className="fa-brands fa-dribbble"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}