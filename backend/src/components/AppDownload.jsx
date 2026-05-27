import "../styles/AppDownload.css";

// Aapki full combined screenshots wali image
import phoneMain from "../assets/screen3.png";

export default function AppDownload() {
    return (
        <section className="app-section">
            <div className="app-card">

                {/* ── Left Side: Text + Buttons ── */}
                <div className="app-content">
                    <h2 className="app-heading">
                        Book a cleaning service <br /> in just minutes.
                    </h2>
                    <p className="app-subtext">
                        Download the Safai Sewa app and schedule your first cleaning service today — fast, easy, and reliable.
                    </p>

                    <div className="app-store-btns">
                        {/* Google Play */}
                        <a href="#" className="store-btn google" aria-label="Get it on Google Play">
                            <svg width="28" height="28" viewBox="0 0 48 48">
                                <path fill="#4CAF50" d="M8 6.3v35.4l20-17.7z" />
                                <path fill="#FF5252" d="M8 6.3l20 17.7 5.6-5-19-10.8A3 3 0 008 6.3z" />
                                <path fill="#FFD740" d="M8 41.7a3 3 0 006.6 1.7l19-10.8-5.6-5z" />
                                <path fill="#448AFF" d="M33.6 19l-5.6 5 5.6 5 5.6-3.2a3 3 0 000-3.6z" />
                            </svg>
                            <div className="store-text">
                                <span className="store-sub">GET IT ON</span>
                                <span className="store-name">Google Play</span>
                            </div>
                        </a>

                        {/* App Store */}
                        <a href="#" className="store-btn apple" aria-label="Download on the App Store">
                            <svg width="26" height="28" viewBox="0 0 814 1000" fill="white">
                                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49 192.5-49 30.8 0 134.2 2.6 198.4 99zM549.5 148.5c22.5-26.8 38.5-64.3 38.5-101.8 0-5.2-.6-10.4-1.3-14.9-36.4 1.3-79.2 24.4-104.8 54.7-20.1 22.5-39.5 60-39.5 98.1 0 5.8.6 11.6 1.3 16.9 2.6.6 5.8.6 8.4.6 32.6 0 73.8-22.5 97.4-53.6z" />
                            </svg>
                            <div className="store-text">
                                <span className="store-sub">Download on the</span>
                                <span className="store-name">App Store</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* ── Right Side: Full Size Image Mockup ── */}
                <div className="app-phones">
                    <img src={phoneMain} alt="Safai Sewa App Showcase" className="app-showcase-img" />
                </div>

            </div>
        </section>
    );
}