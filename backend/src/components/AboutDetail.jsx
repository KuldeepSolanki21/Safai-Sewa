import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { aboutData } from "../Data/aboutdata";
import "../styles/AboutDetail.css";

import WhyChooseUs from "./WhyChooseUs";
import ContactSection from "./ContactSection";

// Banner ke back image ke liye standard image import (Aap iska path change kar sakte hain)
import aboutBannerBg from "../assets/download.jpeg";

export default function AboutDetail() {
    const { aboutId } = useParams(); // URL se id nikalega (our-team, why-us, our-story)
    const data = aboutData[aboutId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [aboutId]);

    if (!data) {
        return (
            <div className="about-error">
                <h2>Page Not Found</h2>
                <Link to="/" className="back-btn">Go Back Home</Link>
            </div>
        );
    }

    // Dynamic ya fallback image nikalne ka logic
    const currentBg = data.bgImage || aboutBannerBg;

    return (
        <>
            <div className="about-detail-page">

                {/* ── FIXED: FULL SCREEN GREEN IMAGE BANNER (image_b20ffd.jpg style) ── */}
                <div
                    className="about-banner-premium"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(26, 67, 20, 0.88), rgba(46, 125, 50, 0.82)), url(${currentBg})`
                    }}
                >
                    {/* Floating circular decorative rings */}
                    <div className="about-banner-rings">
                        <div className="ab-ring ring-left"></div>
                        <div className="ab-ring ring-right"></div>
                    </div>

                    <div className="about-banner-premium-content">
                        <h1 className="animate-pop">{data.title}</h1>
                        <p className="animate-fade-up">{data.tagline}</p>

                        {/* Premium Service Badge Button exactly like image_b20ffd.jpg */}
                        <div className="about-banner-badge animate-fade-up">
                            Premium Safai Service
                        </div>
                    </div>
                </div>

                {/* ── Main Content Section ── */}
                <div className="about-main-container">
                    <p className="about-description-text">{data.content}</p>

                    {/* ── CONDITIONAL LAYOUTS ACCORDING TO PAGE ── */}

                    {/* 1. Our Team Grid */}
                    {data.extraType === "team" && (
                        <div className="about-team-grid">
                            {data.items.map((member, i) => (
                                <div key={i} className="team-card">
                                    <div className="team-img-placeholder">
                                        {member.img ? <img src={member.img} alt={member.name} /> : <i className="fa-solid fa-user-tie"></i>}
                                    </div>
                                    <h4>{member.name}</h4>
                                    <p>{member.role}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 2. Why Us Features List (Reverted back to clean white rows grid style) */}
                    {data.extraType === "features" && (
                        <div className="about-features-grid">
                            {data.items.map((feature, i) => (
                                <div key={i} className="about-feature-box">
                                    <div className="feat-icon-box">
                                        <i className={`fa-solid ${feature.icon}`}></i>
                                    </div>
                                    <div className="feat-text-box">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 3. Our Story Timeline */}
                    {data.extraType === "timeline" && (
                        <div className="about-timeline">
                            {data.items.map((milestone, i) => (
                                <div key={i} className="timeline-item">
                                    <div className="timeline-year">{milestone.year}</div>
                                    <div className="timeline-content-box">
                                        <h4>{milestone.title}</h4>
                                        <p>{milestone.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* Reusable blocks connected */}
            <WhyChooseUs />
            <ContactSection />
        </>
    );
}