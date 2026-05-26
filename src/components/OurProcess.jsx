import React from "react";
import "../styles/OurProcess.css";

const steps = [
    {
        id: 1,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        title: "Make an Appointment",
        desc: "Leave a solicitation on the site and get a 7% rebate on the primary request",
    },
    {
        id: 2,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l4-8 4 4 4-6 4 10" />
                <circle cx="19" cy="17" r="2" />
                <circle cx="3" cy="17" r="2" />
            </svg>
        ),
        title: "Working Process",
        desc: "At a helpful time for you, the cleaners will come to you and lead cleaning of the premises",
    },
    {
        id: 3,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="13" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <line x1="6" y1="14" x2="10" y2="14" />
            </svg>
        ),
        title: "Payment Process",
        desc: "After you ensure that everything is finished by your desires",
    },
];

export default function OurProcess() {
    return (
        <section className="process-section">
            <h2 className="process-heading">Our Process</h2>

            <div className="process-wrapper">
                {steps.map((step, i) => (
                    <React.Fragment key={step.id}>
                        {/* Step Card */}
                        <div className="process-step">
                            <div className="icon-wrap">
                                {step.icon}
                                <span className="step-badge">{step.id}</span>
                            </div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>

                        {/* Arrow between steps */}
                        {i < steps.length - 1 && (
                            <div className="arrow-wrap">
                                <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                                    <path
                                        d="M0 12 Q30 2 55 12"
                                        stroke="#aaa"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeDasharray="4 3"
                                    />
                                    <polyline
                                        points="50,7 55,12 50,17"
                                        stroke="#aaa"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}