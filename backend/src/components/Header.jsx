import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImg from "../assets/logo.png";
import "../styles/Header.css";
import Auth from "./Auth";

const navItems = [
    { label: "Home", href: "/" },
    {
        label: "Services",
        href: "#",
        isNestedDropdown: true,
        children: [
            {
                name: "Full Home Cleaning",
                id: "home-cleaning",
                subServices: [
                    { label: "Kitchen Deep Cleaning", path: "/service/kitchen-cleaning" },
                    { label: "Window & Glass Wiping", path: "/service/window-wiping" },
                    { label: "Bedroom & Sofa Clean", path: "/service/sofa-cleaning" },
                    { label: "Washroom Sanitization", path: "/service/washroom-sanitization" }
                ]
            },
            {
                name: "Luxury Farmhouse Cleaning",
                id: "farmhouse-cleaning",
                subServices: [
                    { label: "Swimming Pool Deck", path: "/service/pool-deck" },
                    { label: "Open Terrace Wash", path: "/service/terrace-wash" },
                    { label: "Lawn Path Cleaning", path: "/service/lawn-cleaning" },
                    { label: "Post-Party Deep Clean", path: "/service/party-clean" }
                ]
            },
            {
                name: "Office Workspace Cleaning",
                id: "office-cleaning",
                subServices: [
                    { label: "Workstation Dusting", path: "/service/workstation-dusting" },
                    { label: "Server Room Safety", path: "/service/server-room" },
                    { label: "Conference Room Care", path: "/service/conference-room" },
                    { label: "Carpet Shampooing", path: "/service/carpet-shampooing" }
                ]
            },
            {
                name: "Commercial & Shop Cleaning",
                id: "commercial-cleaning",
                subServices: [
                    { label: "Retail Shop Front", path: "/service/retail-shop" },
                    { label: "Restaurant Degreasing", path: "/service/restaurant-degreasing" },
                    { label: "Floor Deep Scrubbing", path: "/service/floor-scrubbing" },
                    { label: "Showroom Deep Clean", path: "/service/showroom-cleaning" }
                ]
            }
        ]
    },
    {
        label: "About Us",
        href: "#",
        children: [
            { name: "Our Team", path: "/about/our-team" },
            { name: "Why Us", path: "/about/why-us" },
            { name: "Our Story", path: "/about/our-story" }
        ]
    },
    { label: "FAQ'S", href: "/?scroll=faq" },
    { label: "Contact Us", href: "#contact" },
];

const ChevronIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const NavItem = ({ label, children, href, isNestedDropdown }) => {
    const [open, setOpen] = useState(false);
    const [activeSubId, setActiveSubId] = useState(null);
    const hasChildren = children && children.length > 0;

    return (
        <li
            className="gs-nav-item"
            onMouseEnter={() => hasChildren && setOpen(true)}
            onMouseLeave={() => {
                if (hasChildren) {
                    setOpen(false);
                    setActiveSubId(null);
                }
            }}
        >
            {hasChildren ? (
                <a href="#" className="gs-nav-link" onClick={(e) => e.preventDefault()}>
                    {label}
                    <span className={`gs-chevron ${open ? "open" : ""}`}>
                        <ChevronIcon />
                    </span>
                </a>
            ) : href.startsWith("/") ? (
                <Link to={href} className="gs-nav-link">{label}</Link>
            ) : (
                <a href={href} className="gs-nav-link">{label}</a>
            )}

            {hasChildren && open && (
                <ul className={`gs-dropdown ${isNestedDropdown ? "gs-multi-level-menu" : ""}`}>
                    {children.map((child) => {
                        const hasSubs = child.subServices && child.subServices.length > 0;

                        return (
                            <li
                                key={child.name || child.id}
                                className={`gs-dropdown-item-wrapper ${hasSubs ? "gs-has-subs" : ""}`}
                                onMouseEnter={() => hasSubs && setActiveSubId(child.id)}
                            >
                                {hasSubs ? (
                                    <>
                                        <div className="gs-dropdown-parent-title">
                                            {child.name} <span className="gs-arrow-right">→</span>
                                        </div>
                                        {activeSubId === child.id && (
                                            <ul className="gs-nested-flyout">
                                                {child.subServices.map((sub) => (
                                                    <li key={sub.label}>
                                                        <Link to={sub.path} className="gs-dropdown-link" onClick={() => setOpen(false)}>
                                                            {sub.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link to={child.path} className="gs-dropdown-link" onClick={() => setOpen(false)}>
                                        {child.name}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
};

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // ── 🔒 LIVE APPLICATION SESSION STATE LAYER ──
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("customer");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedName = localStorage.getItem("userName");
        const storedRole = localStorage.getItem("userRole");

        if (token && storedName) {
            setIsLoggedIn(true);
            setUserName(storedName);
            setUserRole(storedRole || "customer");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPhone");
        setIsLoggedIn(false);
        alert("Logged out successfully.");
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", controlHeader);
        return () => window.removeEventListener("scroll", controlHeader);
    }, [lastScrollY]);

    const [activeMobileMenu, setActiveMobileMenu] = useState({});
    const [activeMobileSub, setActiveMobileSub] = useState({});

    const toggleMobileMenu = (label) => {
        setActiveMobileMenu(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const toggleMobileSubCategory = (name) => {
        setActiveMobileSub(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <header className={`gs-header ${showHeader ? "gs-header-visible" : "gs-header-hidden"} ${lastScrollY > 50 ? "gs-header-scrolled" : ""}`}>
            <div className="gs-nav-wrapper">
                <div className="gs-nav">
                    <Link to="/" className="gs-logo" onClick={() => setMobileOpen(false)}>
                        <div className="gs-logo-icon">
                            <img src={logoImg} alt="Ghar Saathio" className="gs-logo-img" />
                        </div>
                        <div className="gs-logo-text">
                            <div className="safai-logo">Safai</div>
                            <div className="sewa-logo">Sewa</div>
                        </div>
                    </Link>

                    <ul className="gs-desktop-nav">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.label}
                                label={item.label}
                                children={item.children}
                                href={item.href}
                                isNestedDropdown={item.isNestedDropdown}
                            />
                        ))}
                        {/* Inline secure router link for admin accounts session */}
                        {isLoggedIn && userRole === "admin" && (
                            <li className="gs-nav-item">
                                <Link to="/safai-admin-panel" className="gs-nav-link admin-flag-highlight">🛡️ Admin Panel</Link>
                            </li>
                        )}
                    </ul>

                    {/* DYNAMIC DOCK INTERFACES */}
                    <div className="gs-header-action-dock">
                        {isLoggedIn ? (
                            <div className="gs-user-profile-cluster">
                                <span className="gs-profile-greeting">👋 Welcome, {userName.split(" ")[0]}</span>
                                <Link to="/my-account-bookings" className="gs-btn-history">My History</Link>
                                <button onClick={handleLogout} className="gs-btn-logout">Logout</button>
                            </div>
                        ) : (
                            <button className="gs-btn-book" onClick={() => setShowAuth(true)}>
                                <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
                                SIGN UP & LOGIN
                            </button>
                        )}
                    </div>

                    <button className="gs-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Menu">
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="gs-mobile-menu">
                    {navItems.map((item) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isMenuOpen = !!activeMobileMenu[item.label];

                        return (
                            <div key={item.label} className="gs-mobile-nav-block">
                                {hasChildren ? (
                                    <>
                                        <div
                                            className={`gs-mobile-link gs-mobile-parent-link ${isMenuOpen ? "active" : ""}`}
                                            onClick={() => toggleMobileMenu(item.label)}
                                        >
                                            <span>{item.label}</span>
                                            <span className={`gs-chevron ${isMenuOpen ? "open" : ""}`}><ChevronIcon /></span>
                                        </div>

                                        <div className={`gs-mobile-submenu-wrapper ${isMenuOpen ? "show" : ""}`}>
                                            {item.children.map((child) => {
                                                const hasSubs = child.subServices && child.subServices.length > 0;
                                                const isSubCatOpen = !!activeMobileSub[child.name];

                                                return (
                                                    <div key={child.name || child.id} className="gs-mobile-nested-block">
                                                        {hasSubs ? (
                                                            <>
                                                                <div
                                                                    className={`gs-mobile-subcat-title ${isSubCatOpen ? "active" : ""}`}
                                                                    onClick={() => toggleMobileSubCategory(child.name)}
                                                                >
                                                                    <span>{child.name}</span>
                                                                    <span className={`gs-chevron ${isSubCatOpen ? "open" : ""}`}><ChevronIcon /></span>
                                                                </div>
                                                                <div className={`gs-mobile-deep-wrapper ${isSubCatOpen ? "show" : ""}`}>
                                                                    {child.subServices.map((sub) => (
                                                                        <Link
                                                                            key={sub.label}
                                                                            to={sub.path}
                                                                            className="gs-mobile-deep-link"
                                                                            onClick={() => setMobileOpen(false)}
                                                                        >
                                                                            {sub.label}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <Link
                                                                to={child.path}
                                                                className="gs-mobile-sub-link"
                                                                onClick={() => setMobileOpen(false)}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    item.href.startsWith("/") ? (
                                        <Link to={item.href} className="gs-mobile-link" onClick={() => setMobileOpen(false)}>{item.label}</Link>
                                    ) : (
                                        <a href={item.href} className="gs-mobile-link" onClick={() => setMobileOpen(false)}>{item.label}</a>
                                    )
                                )}
                            </div>
                        );
                    })}

                    {/* Mobile Dynamic Auth Dock */}
                    <div className="gs-mobile-cta">
                        {isLoggedIn ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", padding: "0 15px" }}>
                                <span style={{ color: "#fff", fontWeight: "600", fontSize: "14px", textAlign: "center" }}>Logged in as: {userName}</span>
                                {userRole === "admin" && (
                                    <Link to="/safai-admin-panel" onClick={() => setMobileOpen(false)} style={{ background: "#dc3545", color: "#fff", textDecoration: "none", textAlign: "center", padding: "12px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>🛡️ Go to Admin Panel</Link>
                                )}
                                <Link to="/my-account-bookings" onClick={() => setMobileOpen(false)} style={{ background: "#fff", color: "#2e7d32", textDecoration: "none", textAlign: "center", padding: "12px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>📋 View Booking History</Link>
                                <button onClick={() => { setMobileOpen(false); handleLogout(); }} style={{ background: "transparent", color: "#fff", border: "2px solid #fff", padding: "12px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Logout</button>
                            </div>
                        ) : (
                            <button onClick={() => { setMobileOpen(false); setShowAuth(true); }}>
                                SIGN UP & LOGIN
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showAuth && <Auth onClose={() => setShowAuth(false)} />}
        </header>
    );
};

export default Header;