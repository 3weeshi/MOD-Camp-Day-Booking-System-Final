import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearToken, getUser } from "../services/api.js";
import { useLanguage } from "./LanguageContext.jsx";

function Navbar(){
 const {t,language,toggleLanguage}=useLanguage();
 const user=getUser();
 const navigate=useNavigate();
 const logout=()=>{clearToken();navigate("/");};
 return <nav className="navbar">
  <Link className="brand" to="/"><span className="nav-icon">⛺</span><span>{t.brand}</span></Link>
  <div className="nav-links">
   <NavLink to="/">{t.home}</NavLink><NavLink to="/book">{t.book}</NavLink><NavLink to="/map">{t.map}</NavLink><NavLink to="/instructions">{t.instructions}</NavLink><NavLink to="/assistant">{t.assistant}</NavLink><NavLink to="/contact">{t.contact}</NavLink>
   {user?.role==="user"&&<NavLink to="/dashboard">{t.dashboard}</NavLink>}
   {user?.role==="staff"&&<NavLink to="/staff-dashboard">{t.staff}</NavLink>}
   {!user&&<NavLink to="/login">{t.login}</NavLink>}
   {!user&&<NavLink to="/register">{t.register}</NavLink>}
   {!user&&<NavLink to="/staff-login">{t.staffLoginTitle}</NavLink>}
   <button className="language-btn" onClick={toggleLanguage} type="button"><span>🌐</span>{language==="en"?"عربي":"English"}</button>
   {user&&<button className="logout-btn" onClick={logout} type="button"><span>🚪</span>{t.logout}</button>}
  </div>
 </nav>;
}
export default Navbar;
