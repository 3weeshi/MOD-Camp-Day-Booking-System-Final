import { useEffect, useState } from "react";
import { apiRequest,getUser } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.jsx";
function DashboardPage(){
 const {t}=useLanguage(); const user=getUser(); const [bookings,setBookings]=useState([]);
 useEffect(()=>{apiRequest(`/bookings?userEmail=${encodeURIComponent(user?.email||"")}`).then(setBookings).catch(()=>setBookings([]));},[user?.email]);
 return <section className="page-card"><h1>{t.dashboardTitle}</h1><p>Welcome {user?.name||"Guest"}</p><div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Tent</th><th>Date</th><th>People</th><th>{t.status}</th></tr></thead><tbody>{bookings.map(b=><tr key={b.id}><td>{b.id}</td><td>{b.name}</td><td>{b.tentName}</td><td>{b.date}</td><td>{b.people}</td><td><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></td></tr>)}</tbody></table></div></section>;
}
export default DashboardPage;
