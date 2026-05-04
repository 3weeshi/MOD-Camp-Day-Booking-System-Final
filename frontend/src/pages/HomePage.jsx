import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.jsx";

function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const startBooking = () => {
    navigate(isLoggedIn() ? "/book" : "/login");
  };

  const info = [
    { icon: "📍", title: t.location, text: language === "ar" ? "مخيم عائلي في منطقة صبحان داخل الكويت." : "A family camp located in Sabhan, Kuwait." },
    { icon: "🕘", title: t.opening, text: language === "ar" ? "الدخول من وقت افتتاح المخيم صباحًا والخروج عند الإغلاق الساعة 11 مساءً." : "Entry starts in the morning and checkout is when the camp closes at 11:00 PM." },
    { icon: "🍽️", title: language === "ar" ? "مطاعم ومحلات" : "Restaurants and shops", text: language === "ar" ? "أماكن أكل ومشروبات ومحلات صغيرة داخل المخيم." : "Food, drinks, and small shops are available inside the camp." },
    { icon: "🕌", title: language === "ar" ? "خدمات عامة" : "Public services", text: language === "ar" ? "مسجد، حمامات عامة، ومسرح للفعاليات." : "Mosque, public bathrooms, and a theater for activities." }
  ];

  return (
    <>
      <section className="home-hero-new">
        <div className="hero-copy">
          <div className="pill hero-pill">{t.oneDay}</div>
          <h1>{language === "ar" ? "تجربة مخيم MOD في صبحان" : "MOD Camp Experience in Sabhan"}</h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <button className="button-link" type="button" onClick={startBooking}>{t.bookNow}</button>
            <Link className="button-link secondary" to="/map">{t.map}</Link>
          </div>
        </div>
        <div className="hero-art" aria-label="MOD Camp homepage design"
          style={{
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <img src="/home-hero.png" alt="MOD Camp design"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
          />
        </div>
      </section>

      <section className="info-grid home-info-grid">
        {info.map((card) => (
          <article className="info-card" key={card.title}>
            <span className="big-emoji">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export default HomePage;
