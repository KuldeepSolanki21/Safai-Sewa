import "../styles/CTABanner.css";
export default function CTABanner() {
  return (
    <section className="cta-section">
      <div className="cta-card">

        <div className="cta-left">
          <h2 className="cta-heading">Book Your Cleaning Service Right Now</h2>
          <p className="cta-subtext">
            A spotless home is just one call away — anytime, anywhere with Safai Sewa.
          </p>
        </div>

        <div className="cta-right">
          <a href="tel:+911234567890" className="cta-btn">
            📞 Call +91 9016291487
          </a>
        </div>

      </div>
    </section>
  );
}