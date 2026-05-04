import { useLanguage } from "../components/LanguageContext.jsx";

function MapPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="map-page">
      <div className="section-heading center-heading">
        <h1>{isArabic ? "موقع مخيم الدفاع" : "Defence Camp Location"}</h1>
        <p>{isArabic ? "الكويت - منطقة صبحان" : "Sabhan, Kuwait"}</p>
      </div>

      <div className="map-location-card">
        <div className="google-map-shell large-map">
          <iframe
            title="Sabhan Kuwait Google Map"
            src="https://www.google.com/maps?q=Sabhan%20Kuwait&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="location-side-card">
          <div className="location-icon">📍</div>
          <h2>{isArabic ? "صبحان، الكويت" : "Sabhan, Kuwait"}</h2>
          <p>
            {isArabic
              ? "يمكنك فتح الموقع مباشرة في خرائط Google للوصول إلى منطقة المخيم."
              : "Open the location directly in Google Maps to reach the camp area."}
          </p>
          <a
            className="button-link"
            href="https://www.google.com/maps/search/?api=1&query=Sabhan%20Kuwait"
            target="_blank"
            rel="noreferrer"
          >
            {isArabic ? "فتح في خرائط Google" : "Open in Google Maps"}
          </a>
        </div>
      </div>

      <div className="camp-layout-card">
        <div className="section-heading center-heading compact-heading">
          <h2>{isArabic ? "الخريطة التقريبية للمخيم" : "Approximate Camp Layout"}</h2>
          <p>
            {isArabic
              ? "الخريطة توضح مناطق الخيام الصغيرة والكبيرة و VIP مع المرافق العامة."
              : "The map shows Small, Large, and VIP tent areas with public facilities."}
          </p>
        </div>
        <img
          className="camp-layout-image"
          src="/camp-layout-map.png"
          alt={isArabic ? "الخريطة التقريبية لمخيم الدفاع" : "Defence Camp approximate layout"}
        />
      </div>

      <div className="map-info-footer">
        <div>
          <strong>{isArabic ? "مواعيد الدخول" : "Entry Time"}</strong>
          <span>{isArabic ? "من الساعة 1:00 ظهرًا حتى الساعة 10:00 مساءً" : "1:00 PM to 10:00 PM"}</span>
        </div>
        <div>
          <strong>{isArabic ? "مواعيد عمل المخيم" : "Working Hours"}</strong>
          <span>{isArabic ? "من الساعة 12:00 ظهرًا حتى الساعة 11:00 مساءً" : "12:00 PM to 11:00 PM"}</span>
        </div>
        <div>
          <strong>{isArabic ? "الحجز" : "Booking"}</strong>
          <span>{isArabic ? "الحجز ليوم واحد فقط" : "Booking is for one day only"}</span>
        </div>
      </div>
    </section>
  );
}

export default MapPage;
