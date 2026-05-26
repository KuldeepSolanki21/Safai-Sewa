import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CleaningSlider.css";
import ServiceCard from "./ServiceCard";

// Mapping valid relevant clean background assets
import homeCleaningImg from "../assets/HomeCleaning.jpeg";
import KitchenCleaning from "../assets/KitchenCleaning.jpeg";
import farmHouse from "../assets/farmHouse.jpeg";
import Office from "../assets/Officecleanservicenearme.jpeg";
import CommercialShop from "../assets/CommercialShop.jpeg";

// FIXED: Filtered down to exactly 4 master core business services matching your framework
const baseServices = [
    {
        id: 1,
        title: "Full Home Cleaning",
        desc: "Complete deep cleaning solutions for rooms, kitchen cabinets scrubbing, washroom sanitization, and living areas dust clearups.",
        img: homeCleaningImg,
        path: "/book-now?service=home-cleaning",
    },
    {
        id: 2,
        title: "Luxury Farmhouse Cleaning",
        desc: "Premium end-to-end villa dusting care, swimming pool deck high-pressure wash, stone pathways jet wash, and post-party resets.",
        img: farmHouse,
        path: "/book-now?service=farmhouse-cleaning",
    },
    {
        id: 3,
        title: "Office Workspace Cleaning",
        desc: "Professional deep cleaning tailored safely for corporate cabins, workstations micro-dusting, server rooms, and meeting rooms.",
        img: Office, // CRITICAL FIX: Variable name successfully matched with import statement
        path: "/book-now?service=office-cleaning",
    },
    {
        id: 4,
        title: "Commercial & Shop Cleaning",
        desc: "Industrial grade floor single-disc machinery scrubbing, heavy restaurant kitchen degreasing, and high-traffic retail storefront glass wiping.",
        img: CommercialShop,
        path: "/book-now?service=commercial-cleaning",
    },
];

const services = [...baseServices, ...baseServices];

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
    useEffect(() => {
        const fn = () => setW(window.innerWidth);
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);
    return w;
}

export default function CleaningSlider() {
    const [idx, setIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const navigate = useNavigate();
    const width = useWindowWidth();
    const containerRef = useRef(null);

    const visible = width <= 640 ? 1 : width <= 1024 ? 2 : 3;
    const gap = 24;
    const [cardW, setCardW] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const calculatedWidth = (containerWidth - (visible - 1) * gap) / visible;
            setCardW(calculatedWidth);
        }
    }, [width, visible]);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setIdx((prev) => prev + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, [isHovered]);

    const handleTransitionEnd = () => {
        if (idx >= baseServices.length) {
            setIsTransitioning(false);
            setIdx(0);
        }
    };

    const handleCardClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    const translateX = idx * (cardW + gap);

    return (
        <section
            className="slider-section"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="slider-container" ref={containerRef}>
                <div className="slider-header">
                    <div className="title-area">
                        <span className="subtitle">WHAT WE OFFER</span>
                        <h2 className="slider-title">Our Professional Cleaning Services</h2>
                    </div>
                </div>

                <div className="slider-wrapper">
                    <div
                        className="slider-track"
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translateX(-${translateX}px)`,
                            transition: isTransitioning
                                ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
                                : "none"
                        }}
                    >
                        {services.map((s, index) => (
                            /* FIXED: Pure clean wrapper. Is block par koi click nahi hai ab */
                            <div key={`${s.id}-${index}`}>
                                {/* FIXED: handleBookNow prop ke through function pass kiya */}
                                <ServiceCard
                                    service={s}
                                    cardW={cardW}
                                    handleBookNow={handleCardClick}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}