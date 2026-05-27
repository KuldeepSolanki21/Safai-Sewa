import { useNavigate } from "react-router-dom"; // 💥 1. useNavigate import kiya
import "../styles/WhyChooseUs.css";

import teamImg from "../assets/Trust.webp";
import teamImg2 from "../assets/Map.webp";

const features = [
    {
        id: 1,
        title: "Experience",
        desc: "With years of experience, our team has the knowledge and expertise to tackle any cleaning challenge.",
    },
    {
        id: 2,
        title: "Quality",
        desc: "We are committed to providing high-quality cleaning services that exceed your expectations.",
    },
    {
        id: 3,
        title: "Flexibility",
        desc: "We understand that every home or office has unique cleaning needs, and we offer customized solutions to fit your schedule and budget.",
    },
    {
        id: 4,
        title: "Satisfaction",
        desc: "We take pride in delivering high-quality cleaning services and strive to ensure your complete satisfaction with every visit.",
    },
];

export default function WhyChooseUs() {
    const navigate = useNavigate(); // 💥 2. Initialize navigate function

    return (
        <section className="wcu-section">
            <div className="wcu-container">

                {/* ── Left Content ── */}
                <div className="wcu-left">
                    <h2 className="wcu-heading">Why Choose Us?</h2>
                    <p className="wcu-subtext">
                        Experience the ultimate cleaning service with our dedicated team. We
                        provide top-quality, convenient, reliable, and sustainable cleaning
                        solutions that exceed your expectations.
                    </p>

                    <div className="wcu-grid">
                        {features.map((f) => (
                            <div className="wcu-feature" key={f.id}>
                                <div className="wcu-feature-title">
                                    <span className="wcu-dot" />
                                    <h4>{f.title}</h4>
                                </div>
                                <p className="wcu-feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right Images ── */}
                <div className="wcu-right">

                    {/* 💥 3. Alert hata kar seedha route redirect daal diya path '/book-now' par */}
                    <div className="wcu-badge" onClick={() => navigate("/book-now")}>
                        <svg viewBox="0 0 100 100" width="100" height="100">
                            <defs>
                                <path
                                    id="circle-text"
                                    d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                                />
                            </defs>
                            <text fontSize="10" fill="#2e7d32" fontWeight="700" letterSpacing="2.2">
                                <textPath href="#circle-text">
                                    BOOK APPOINTMENT • BOOK APPOINTMENT •
                                </textPath>
                            </text>
                        </svg>
                        <div className="badge-arrow">&#8594;</div>
                    </div>

                    {/* Two overlapping pill ovals */}
                    <div className="wcu-images">
                        <div className="img-oval img-oval--top">
                            <img src={teamImg} alt="Cleaning team" />
                        </div>
                        <div className="img-oval img-oval--bottom">
                            <img src={teamImg2} alt="Cleaning team" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}