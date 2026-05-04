import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest,setToken,setUser } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.jsx";
function LoginPage(){
 const {t}=useLanguage(); const nav=useNavigate();
 const [email,setEmail]=useState("aisha@test.com"); const [password,setPassword]=useState("1234"); const [error,setError]=useState("");
 const submit=async e=>{e.preventDefault();setError("");try{const data=await apiRequest("/auth/login",{method:"POST",body:JSON.stringify({email,password})});setToken(data.token);setUser(data.user);nav("/book");}catch(err){setError(err.message);}};
 return <section className="page-card auth"><h1>{t.loginTitle}</h1><p className="muted">Demo: aisha@test.com / 1234</p><form className="simple-form" onSubmit={submit}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/><button type="submit">{t.login}</button></form>{error&&<p className="error">{error}</p>}<p><Link to="/register">Create new account</Link></p></section>;
}
export default LoginPage;
