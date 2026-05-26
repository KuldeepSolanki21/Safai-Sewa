import { useState, useEffect } from "react";
import "../styles/ScrollToTop.css"; // CSS file link karenge

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Yeh function check karega ki user ne kitna scroll kiya hai
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true); // Agar 300px se zyada scroll kiya toh button dikhao
        } else {
            setIsVisible(false); // Wapas upar aane par chhupa do
        }
    };

    // Screen ko smooth scroll karke sabse upar le jaane ke liye
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button onClick={scrollToTop} className="scroll-btn" title="Go to Top">
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            )}
        </div>
    );
}