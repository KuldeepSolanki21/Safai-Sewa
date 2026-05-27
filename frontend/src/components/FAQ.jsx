import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // ZAROORI: URL tracking ke liye import kiya
import "../styles/FAQ.css";

const faqs = [
    {
        id: 1,
        question: "What is Safai Sewa?",
        answer: "Safai Sewa is a professional cleaning service platform that connects you with verified and trained cleaning experts for your home, office, and commercial spaces — all at the tap of a button.",
    },
    {
        id: 2,
        question: "How is Safai Sewa different from hiring cleaners directly?",
        answer: "Unlike hiring independently, Safai Sewa provides background-verified professionals, standardized quality checks, insured services, and easy online booking — giving you peace of mind every time.",
    },
    {
        id: 3,
        question: "How do I book a cleaning service?",
        answer: "Simply visit our website or download the Safai Sewa app, choose your service, select a date and time that suits you, and confirm your booking. It's that easy!",
    },
    {
        id: 4,
        question: "How quickly can a cleaner reach my location?",
        answer: "Depending on your area and availability, our cleaning professionals can reach you within a few hours of booking. We also offer scheduled bookings for your convenience.",
    },
    {
        id: 5,
        question: "Can I book multiple cleaning services in one visit?",
        answer: "Yes! You can combine services like home cleaning, deep cleaning, and kitchen cleaning in a single visit. Just select all the services you need while booking.",
    },
    {
        id: 6,
        question: "Can I schedule a recurring cleaning service?",
        answer: "Absolutely. Safai Sewa offers weekly, bi-weekly, and monthly recurring plans so your space stays clean without you having to re-book every time.",
    },
    {
        id: 7,
        question: "Can I cancel or reschedule my booking?",
        answer: "Yes, you can cancel or reschedule your booking up to a few hours before the scheduled time without any extra charges. Check our cancellation policy for full details.",
    },
    {
        id: 8,
        question: "Are Safai Sewa professionals background-verified?",
        answer: "Yes, every cleaning professional on our platform goes through a thorough background verification and training process before they are allowed to serve our customers.",
    },
    {
        id: 9,
        question: "What areas do you currently serve?",
        answer: "We are currently serving major cities and are expanding rapidly. Enter your location on our website or app to check if we're available in your area.",
    },
];

export default function FAQ() {
    const [openId, setOpenId] = useState(null);
    const location = useLocation(); // URL params read karne ke liye variable banaya

    const toggle = (id) => setOpenId(openId === id ? null : id);

    // DYNAMIC AUTO-SCROLL ENGINE
    useEffect(() => {
        // Agar URL ke andar '?scroll=faq' param milta hai
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("scroll") === "faq") {
            const element = document.getElementById("faq-section");
            if (element) {
                // 200ms ka minor timeout diya taaki page load hone ke baad transition smooth ho
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 200);
            }
        }
    }, [location]); // Jab bhi user page badlega ye render ho jayega

    return (
        <section id="faq-section" className="faq-section">
            <div className="faq-container">

                {/* Header */}
                <p className="faq-label">FAQ'S</p>
                <h2 className="faq-heading">
                    Frequently Asked <br /> Questions
                </h2>

                {/* Accordion */}
                <div className="faq-list">
                    {faqs.map((faq) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className={`faq-item ${isOpen ? "open" : ""}`}
                                onClick={() => toggle(faq.id)}
                            >
                                <div className="faq-question">
                                    <span>{faq.question}</span>
                                    <span className="faq-icon">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </span>
                                </div>

                                <div className="faq-answer-wrapper">
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}