import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, getUser } from "../services/api.js";
import { useLanguage } from "./LanguageContext.jsx";

function BookingForm({tents=[],selectedTentId,onSelectTent}){
 const {t,language}=useLanguage();
 const navigate=useNavigate();
 const user=getUser();
 const [captchaCode,setCaptchaCode]=useState("4821");
 const [captchaInput,setCaptchaInput]=useState("");
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(false);
 const [form,setForm]=useState({name:user?.name||"Aisha",phone:user?.phone||"55775252",date:"",people:4,notes:""});
 const selectedTent=useMemo(()=>tents.find(x=>String(x.id)===String(selectedTentId))||tents[0],[selectedTentId,tents]);

 useEffect(()=>setCaptchaCode(String(Math.floor(1000+Math.random()*9000))),[]);
 useEffect(()=>{
  if(selectedTent?.capacity && Number(form.people)>Number(selectedTent.capacity)){
   setForm((current)=>({...current,people:selectedTent.capacity}));
  }
 },[selectedTent?.id]);

 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{
  e.preventDefault();
  setError("");
  if(!selectedTent)return setError("Please select a tent first.");
  if(captchaInput!==captchaCode)return setError("Captcha is incorrect.");
  setLoading(true);
  try{
   const booking=await apiRequest("/bookings",{
    method:"POST",
    body:JSON.stringify({...form,userEmail:user?.email||"aisha@test.com",tentId:selectedTent.id})
   });
   navigate("/confirmation",{state:{booking}});
  }catch(err){
   setError(err.message);
  }finally{
   setLoading(false);
  }
 };

 return <form className="booking-form" onSubmit={submit}><h2>{t.bookingTitle}</h2><p className="muted">{t.oneDay}</p>
  <label>{t.selectTent}</label>
  <select value={selectedTent?.id||""} onChange={e=>onSelectTent?.(e.target.value)} required>
   {tents.map(tent=><option key={tent.id} value={tent.id}>{language==="ar"?tent.nameAr:tent.name}</option>)}
  </select>
  {selectedTent&&<div className="booking-price-box">
   <span>{language==="ar"?"رقم الخيمة":"Tent Number"}: <strong>{selectedTent.code||selectedTent.id}</strong></span>
   <span>{t.price}: <strong>{selectedTent.price} KWD</strong>{selectedTent.deposit ? (language === "ar" ? ` + ${selectedTent.deposit} د.ك تأمين` : ` + ${selectedTent.deposit} KWD deposit`) : ""}</span>
  </div>}
  <label>Name</label><input name="name" value={form.name} onChange={update} required/>
  <label>Phone</label><input name="phone" value={form.phone} onChange={update} required/>
  <label>Date</label><input name="date" type="date" value={form.date} onChange={update} required/>
  <label>Number of people</label><input name="people" type="number" min="1" max={selectedTent?.capacity||12} value={form.people} onChange={update} required/>
  <label>Notes</label><textarea name="notes" value={form.notes} onChange={update} placeholder="Optional notes"/>
  <div className="captcha-box"><strong>{t.captcha}: {captchaCode}</strong><input value={captchaInput} onChange={e=>setCaptchaInput(e.target.value)} placeholder={t.captchaHelp} required/></div>
  {error&&<p className="error">{error}</p>}<button type="submit" disabled={loading}>{loading?"Submitting...":t.submitBooking}</button>
 </form>;
}
export default BookingForm;
