import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest,setToken,setUser } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.jsx";
function RegisterPage(){
 const {t}=useLanguage(); const nav=useNavigate();
 const [form,setForm]=useState({name:"Aisha",phone:"55775252",email:"",password:""}); const [error,setError]=useState("");
 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setError("");try{const data=await apiRequest("/auth/register",{method:"POST",body:JSON.stringify(form)});setToken(data.token);setUser(data.user);nav("/book");}catch(err){setError(err.message);}};
 return <section className="page-card auth"><h1>{t.registerTitle}</h1><form className="simple-form" onSubmit={submit}><input name="name" value={form.name} onChange={update} placeholder="Name" required/><input name="phone" value={form.phone} onChange={update} placeholder="Phone" required/><input name="email" type="email" value={form.email} onChange={update} placeholder="Email" required/><input name="password" type="password" value={form.password} onChange={update} placeholder="Password" required/><button type="submit">{t.register}</button></form>{error&&<p className="error">{error}</p>}</section>;
}
export default RegisterPage;
