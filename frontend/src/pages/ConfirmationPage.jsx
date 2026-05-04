import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext.jsx";
function ConfirmationPage(){const {t}=useLanguage();const booking=useLocation().state?.booking;return <section className="page-card confirmation"><div className="confirm-icon">✅</div><h1>{t.confirmTitle}</h1><p className="success">Your booking request was submitted successfully.</p>{booking&&<div className="confirmation-box"><p><b>Booking ID:</b> {booking.id}</p><p><b>Name:</b> {booking.name}</p><p><b>Phone:</b> {booking.phone}</p><p><b>Tent:</b> {booking.tentName}</p><p><b>Date:</b> {booking.date}</p><p><b>Status:</b> {booking.status}</p></div>}<Link className="button-link" to="/dashboard">Go to My Bookings</Link></section>;}
export default ConfirmationPage;
