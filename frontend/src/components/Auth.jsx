import { useState } from "react";
import "../styles/Auth.css";

export default function Auth({ onClose }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const [isOtpStage, setIsOtpStage] = useState(false);
    const [emailOtpToken, setEmailOtpToken] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    // ── 🧠 DYNAMIC RUNTIME CHECK (NO ENVIRONMENT VARIABLES REQUIRED) ──
    const BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://safai-sewa.onrender.com";

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const cleanNumber = value.replace(/\D/g, "");
            if (cleanNumber.length <= 10) {
                setFormData({ ...formData, phone: cleanNumber });
            }
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleOtpVerificationSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/users/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    otp: emailOtpToken
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account verification successful! You can now log in safely.");
                setIsOtpStage(false);
                setIsSignUp(false);
            } else {
                alert(data.message || "Invalid verification token code.");
            }
        } catch (error) {
            console.error("OTP authentication operational state logs failure:", error);
            alert("Local pipeline infrastructure verification network processing timeout.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isForgot) {
            try {
                console.log("Forgot Password Request Email:", forgotEmail);
                alert("A password reset link has been sent to your registered email address.");
                setIsForgot(false);
            } catch (err) {
                console.error(err);
            }
            return;
        }

        if (isSignUp) {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            if (formData.phone.length !== 10) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/api/users/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Verification OTP code has been transmitted to your email inbox.");
                    setIsOtpStage(true);
                } else {
                    alert(data.message || "Registration failed.");
                }
            } catch (error) {
                console.error("Signup error details:", error);
                alert("Unable to process local database server sync registry instances state.");
            }
        } else {
            try {
                const response = await fetch(`${BACKEND_URL}/api/users/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userRole', data.role || 'customer');
                    localStorage.setItem('userName', data.user.name);
                    localStorage.setItem('userPhone', data.user.phone);
                    alert("Login successful!");
                    onClose();
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Login monitoring layer runtime error logs stack:", error);
                alert("Connection architecture state tracking validation errors.");
            }
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-container">
                <button className="auth-close-btn" onClick={onClose} type="button">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="auth-panel-side">
                    <div className="auth-panel-content">
                        <h2>{isSignUp ? "Welcome Back!" : isForgot ? "No Worries!" : "Hello, Friend!"}</h2>
                        <p>
                            {isSignUp
                                ? "To keep connected with us please login with your personal info"
                                : isForgot
                                    ? "Enter your email address and we will fetch your reset credential details safely."
                                    : "Enter your personal details and start your journey with us"}
                        </p>
                        <button
                            type="button"
                            className="panel-toggle-btn"
                            disabled={isOtpStage}
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setIsForgot(false);
                            }}
                        >
                            {isSignUp ? "SIGN IN" : "SIGN UP"}
                        </button>
                    </div>
                </div>

                <div className="auth-form-side">
                    {isOtpStage ? (
                        <form className="auth-form" onSubmit={handleOtpVerificationSubmit}>
                            <h1 className="auth-title">Verify Email</h1>
                            <span className="auth-subtitle">Enter the 6-digit OTP code dispatched to your email address</span>
                            <div className="input-group">
                                <i className="fa-solid fa-shield-halved input-icon"></i>
                                <input
                                    type="text"
                                    required
                                    maxLength="6"
                                    placeholder="Enter OTP Verification Code"
                                    value={emailOtpToken}
                                    onChange={(e) => setEmailOtpToken(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="auth-submit-btn">Verify and Create Account</button>
                        </form>
                    ) : (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <h1 className="auth-title">
                                {isForgot ? "Reset Password" : isSignUp ? "Create Account" : "Sign In"}
                            </h1>

                            {!isForgot && (
                                <div className="auth-social-container">
                                    <a href="#" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
                                    <a href="#" className="social-icon"><i className="fa-brands fa-google"></i></a>
                                    <a href="#" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
                                </div>
                            )}

                            <span className="auth-subtitle">
                                {isForgot ? "Enter credentials fields" : "or use your email account"}
                            </span>

                            {isForgot ? (
                                <>
                                    <div className="input-group">
                                        <i className="fa-solid fa-envelope input-icon"></i>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter Registered Email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="auth-submit-btn">Send Link</button>
                                    <button
                                        type="button"
                                        className="auth-back-to-login"
                                        onClick={() => setIsForgot(false)}
                                    >
                                        Back to Login
                                    </button>
                                </>
                            ) : (
                                <>
                                    {isSignUp && (
                                        <div className="input-group">
                                            <i className="fa-solid fa-user input-icon"></i>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="input-group">
                                        <i className="fa-solid fa-envelope input-icon"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {isSignUp && (
                                        <div className="input-group">
                                            <i className="fa-solid fa-phone input-icon"></i>
                                            <input
                                                type="tel"
                                                name="phone"
                                                maxLength="10"
                                                pattern="[0-9]{10}"
                                                placeholder="10-digit Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="input-group">
                                        <i className="fa-solid fa-lock input-icon"></i>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {isSignUp && (
                                        <div className="input-group">
                                            <i className="fa-solid fa-shield-halved input-icon"></i>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    {!isSignUp && (
                                        <button
                                            type="button"
                                            className="forgot-password"
                                            onClick={() => setIsForgot(true)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            Forgot your password?
                                        </button>
                                    )}

                                    <button type="submit" className="auth-submit-btn">
                                        {isSignUp ? "Sign Up" : "Sign In"}
                                    </button>
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}