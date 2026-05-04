import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest,setToken,setUser } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.jsx";
function StaffLoginPage(){
 const {t}=useLanguage(); const nav=useNavigate(); const [email,setEmail]=useState("staff@mod.com"); const [password,setPassword]=useState("admin123"); const [error,setError]=useState("");
 const submit=async e=>{e.preventDefault();setError("");try{const data=await apiRequest("/auth/staff-login",{method:"POST",body:JSON.stringify({email,password})});setToken(data.token);setUser(data.user);nav("/staff-dashboard");}catch(err){setError(err.message);}};
 return <section className="page-card auth"><h1>{t.staffLoginTitle}</h1><p className="muted">Demo: staff@mod.com / admin123</p><form className="simple-form" onSubmit={submit}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Staff Email" type="email" required/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/><button type="submit">{t.login}</button></form>{error&&<p className="error">{error}</p>}</section>;
}
export default StaffLoginPage;
