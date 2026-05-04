import { useState } from "react";
import { useLanguage } from "../components/LanguageContext.jsx";
function ContactPage(){const {t}=useLanguage();const [sent,setSent]=useState(false);return <section className="page-card auth"><h1>{t.contactTitle}</h1><p>Email: info@modcamp.com</p><p>Phone: +965 55775252</p><form className="simple-form" onSubmit={e=>{e.preventDefault();setSent(true);}}><input placeholder="Name" required/><input placeholder="Email" type="email" required/><textarea placeholder="Message" required/><button type="submit">Send</button></form>{sent&&<p className="success">Message sent successfully.</p>}</section>;}
export default ContactPage;
