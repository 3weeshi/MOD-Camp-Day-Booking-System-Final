import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm.jsx";
import { useLanguage } from "../components/LanguageContext.jsx";
import { apiRequest } from "../services/api.js";

function BookingPage(){
 const {t, language}=useLanguage();
 const [params,setParams]=useSearchParams();
 const [tents,setTents]=useState([]);
 const [selectedTentId,setSelectedTentId]=useState(params.get("tent")||"S01");

 useEffect(()=>{apiRequest("/tents").then((items)=>{
   setTents(items);
   const requested=params.get("tent");
   if(!requested && items[0]) setSelectedTentId(items[0].id);
 }).catch(()=>setTents([]));},[]);

 const selectedTent=useMemo(()=>tents.find(t=>String(t.id)===String(selectedTentId))||tents[0],[selectedTentId,tents]);
 const selectTent=id=>{setSelectedTentId(String(id));setParams({tent:String(id)});};

 return (
  <section className="booking-layout focused-booking-layout">
   <div className="camp-layout-card booking-map-only">
    <div className="section-heading compact-heading">
     <h1>{t.bookingTitle}</h1>
     <p>{language === "ar" ? "اختاري رقم الخيمة من المخطط ثم أكملي بيانات الحجز." : "Choose the tent number from the camp layout, then complete the booking form."}</p>
    </div>
    <img
     className="camp-layout-image"
     src="/camp-layout-map.png"
     alt={language === "ar" ? "تصميم مخيم الدفاع" : "Defence Camp layout"}
    />
   </div>
   <BookingForm tents={tents} selectedTentId={selectedTent?.id||selectedTentId} onSelectTent={selectTent}/>
  </section>
 );
}
export default BookingPage;
