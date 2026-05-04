import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";

function TentCard({ tent, onSelect }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const name = language === "ar" ? tent.nameAr : tent.name;
  const description = language === "ar" ? tent.descriptionAr : tent.description;

  const handleSelect = () => {
    onSelect?.(tent.id);
    localStorage.setItem("selectedTentId", String(tent.id));
    navigate(`/book?tent=${tent.id}`);
  };

  return (
    <article className={`tent-card tent-card-${tent.type}`}>
      <div className="tent-visual">
        <div className="tent-icon">{tent.type === "vip" ? "⭐" : "⛺"}</div>
        <div className="tent-pattern" />
      </div>
      <div className="tent-body">
        <div className="pill">{tent.mapArea}</div>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="price-row">{t.price}: {tent.price} KWD{tent.deposit ? (language === "ar" ? ` + ${tent.deposit} د.ك تأمين` : ` + ${tent.deposit} KWD deposit`) : ""}</div>
        <button onClick={handleSelect} type="button"><span>✅</span>{t.bookNow}</button>
      </div>
    </article>
  );
}

export default TentCard;
