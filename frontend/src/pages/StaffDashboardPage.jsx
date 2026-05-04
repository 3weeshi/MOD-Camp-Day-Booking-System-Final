import { useEffect, useState } from "react";
import { apiRequest } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.jsx";

function StaffDashboardPage() {
  const { t, language } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", people: "", notes: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/bookings").then(setBookings).catch((err) => setError(err.message));
  }, []);

  const updateStatus = async (id, status) => {
    setError("");
    try {
      const updated = await apiRequest(`/bookings/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      setBookings((items) => items.map((item) => item.id === updated.id ? updated : item));
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (booking) => {
    setEditingId(booking.id);
    setEditForm({ date: booking.date || "", people: booking.people || "", notes: booking.notes || "" });
  };

  const saveEdit = async (id) => {
    setError("");
    try {
      const updated = await apiRequest(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify(editForm) });
      setBookings((items) => items.map((item) => item.id === updated.id ? updated : item));
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="page-card">
      <h1>{t.staffTitle}</h1>
      <p className="muted">
        {language === "ar" ? "الموظف يقدر يؤكد الحجز، يعدل بياناته، أو يلغيه." : "Staff can confirm, update, or cancel booking requests."}
      </p>
      {error && <p className="error">{error}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Phone</th><th>Tent</th><th>Date</th><th>People</th><th>Notes</th><th>{t.status}</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.tentName}</td>
                <td>{editingId === booking.id ? <input className="table-input" type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} /> : booking.date}</td>
                <td>{editingId === booking.id ? <input className="table-input short" type="number" min="1" value={editForm.people} onChange={(e) => setEditForm({ ...editForm, people: e.target.value })} /> : booking.people}</td>
                <td>{editingId === booking.id ? <input className="table-input" value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} /> : booking.notes}</td>
                <td><span className={`status ${String(booking.status).toLowerCase()}`}>{booking.status}</span></td>
                <td className="actions-cell">
                  <button className="icon-action confirm" onClick={() => updateStatus(booking.id, "Confirmed")} type="button">✅ {t.confirm}</button>
                  <button className="icon-action edit" onClick={() => editingId === booking.id ? saveEdit(booking.id) : startEdit(booking)} type="button">{editingId === booking.id ? "💾 Save" : "✏️ Update"}</button>
                  {editingId === booking.id && <button className="icon-action neutral" onClick={() => setEditingId(null)} type="button">↩ Cancel Edit</button>}
                  <button className="icon-action cancel" onClick={() => updateStatus(booking.id, "Cancelled")} type="button">❌ {t.cancel}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StaffDashboardPage;
