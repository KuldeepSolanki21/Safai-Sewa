import React from "react";
import "../styles/CleaningSlider.css";

// FIXED: handleBookNow prop ko receiver banaya slider connectivity ke liye
export default function ServiceCard({ service, cardW, handleBookNow }) {
  return (
    <div className="service-card" style={{ width: cardW }}>
      {/* Image Section - No icons or strips anymore */}
      <div className="card-image-wrapper">
        <img
          src={service.img}
          alt={service.title}
          className="card-main-image"
        />
      </div>

      {/* Content Section */}
      <div className="card-content">
        <h3 className="card-service-title">{service.title}</h3>
        <p className="card-service-desc">{service.desc}</p>

        {/* FIXED: click handler directly applied here to lock functionality on the button only */}
        <button
          className="card-action-btn"
          onClick={(e) => {
            e.stopPropagation(); // Stops event bubbling to secure standard behavior
            if (handleBookNow) {
              handleBookNow(service.path);
            }
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}