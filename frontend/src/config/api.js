// Centralized API configuration with warm-up ping for Render cold starts
export const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        ? "http://localhost:5000"
        : "https://safai-sewa.onrender.com");

// Warm-up ping to wake up free-tier cloud host (Render) in the background
export const warmUpBackend = () => {
    try {
        fetch(`${BACKEND_URL}/`, { method: "GET", mode: "no-cors" }).catch(() => {});
    } catch {
        // silently ignore warm-up failures
    }
};
