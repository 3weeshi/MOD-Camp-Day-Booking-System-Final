import { useLanguage } from "./LanguageContext.jsx";

function CampMap({ selectedTentId, onSelectTent }) {
  const { t, language } = useLanguage();
  const labels = {
    small: language === "ar" ? "منطقة الخيام الصغيرة" : "Small tents area",
    large: language === "ar" ? "منطقة الخيام الكبيرة" : "Large tents area",
    vip: language === "ar" ? "منطقة خيام VIP" : "VIP tents area",
    services: language === "ar" ? "مطاعم، محلات، مسجد، حمامات عامة، ومسرح" : "Restaurants, shops, mosque, public bathrooms, and theater"
  };
  const areaClass = (id) => selectedTentId === id ? "map-choice active" : "map-choice";

  return (
    <section className="camp-map-card">
      <div className="section-heading compact-heading">
        <h2>{t.mapTitle}</h2>
        <p>{t.location}</p>
      </div>

      <div className="google-map-shell">
        <iframe
          title="Sabhan Kuwait Google Map"
          src="https://www.google.com/maps?q=Sabhan%20Kuwait&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="map-note">
        <strong>{language === "ar" ? "ملاحظة:" : "Note:"}</strong>{" "}
        {language === "ar"
          ? "الخريطة توضح موقع المخيم في صبحان، وتقسيم الخيام داخل المخيم تقريبي لأغراض الحجز."
          : "The map shows the camp location in Sabhan. Tent areas inside the camp are approximate for booking purposes."}
      </div>

      <div className="map-choices">
        <button className={areaClass(1)} type="button" onClick={() => onSelectTent?.(1)}>⛺ {labels.small}</button>
        <button className={areaClass(2)} type="button" onClick={() => onSelectTent?.(2)}>⛺ {labels.large}</button>
        <button className={areaClass(3)} type="button" onClick={() => onSelectTent?.(3)}>⭐ {labels.vip}</button>
        <span className="map-choice services">🍽️ {labels.services}</span>
      </div>
    </section>
  );
}

export default CampMap;
