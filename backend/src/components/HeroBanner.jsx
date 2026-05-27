import React from 'react';
import { Link } from "react-router-dom";
import "../styles/HeroBanner.css";
import bannerBg from "../assets/hero-team.jpeg";

const HeroBanner = () => {
  return (
    <section
      className="hero-full-banner"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="hero-container">
        {/* Left Side Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-icon-container">
              <i className="fa-solid fa-circle-check badge-icon"></i>
            </div>
            <span className="badge-text">Trusted Home Services</span>
          </div>

          <h1 className="hero-title text-pop-up-top">
            Trusted Cleaning <br />
            Services at Your <br />
            <span className="text-green">Doorstep</span>
          </h1>

          <p className="hero-description">
            Professional, reliable and affordable services <br />
            to make your home and life easier.
          </p>

          <div className="hero-actions">
            <Link to="/book-now" className="btn-book" style={{ textDecoration: 'none' }}>
              Book a Service →
            </Link>

            {/* 💥 FIXED: Tera original number aur direct custom default text add kar diya hai */}
            <a
              href="https://wa.me/919274083280?text=Hello%20Safai%20Sewa,%20I%20want%20to%20inquire%20about%20cleaning%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp blob-btn"
              style={{ textDecoration: 'none' }}
            >
              <span className="btn-whatsapp-content">
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </span>
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* SVG Gooey Filter Engine */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: "none" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default HeroBanner;