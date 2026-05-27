import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";


import Header from './components/Header';
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";



import HeroBanner from './components/HeroBanner';
import CleaningSlider from './components/CleaningSlider';
import OurProcess from './components/OurProcess';
import WhyChooseUs from "./components/WhyChooseUs";
import AppDownload from './components/AppDownload';
import CTABanner from './components/CTABanner';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ServiceDetail = lazy(() => import("./components/ServiceDetail"));
const AboutDetail = lazy(() => import("./components/AboutDetail"));
const BookingPage = lazy(() => import("./components/BookingPage"));
const UserBookings = lazy(() => import("./components/UserBookings"));

const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2e7d32',
    fontFamily: 'Inter, sans-serif'
  }}>
    <div className="gs-spinner" style={{
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #2e7d32',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      marginRight: '12px'
    }}></div>
    SafaiSewa loading...
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroBanner />
                <CleaningSlider />
                <OurProcess />
                <CTABanner />
                <WhyChooseUs />
                <AppDownload />
                <FAQ />
                <ContactSection />
              </>
            }
          />
          <Route path="/service/:serviceId/*" element={<ServiceDetail />} />
          <Route path="/about/:aboutId" element={<AboutDetail />} />
          <Route path="/book-now" element={<BookingPage />} />
          <Route path="/safai-admin-panel" element={<AdminDashboard />} />
          <Route path="/my-account-bookings" element={<UserBookings />} />
        </Routes>
      </Suspense>

      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default App;