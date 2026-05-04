const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const mockTents = [
  { id: 1, type: "small", name: "Small Tent", nameAr: "خيمة صغيرة", description: "A simple tent for small groups. It does not include a private bathroom. Public bathrooms are available inside the camp.", descriptionAr: "خيمة بسيطة للمجموعات الصغيرة. لا تحتوي على حمام خاص، وتتوفر حمامات عامة داخل المخيم.", location: "Sabhan, Kuwait", capacity: 4, price: 20, privateBathroom: false, mapArea: "Small tents area", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80" },
  { id: 2, type: "large", name: "Large Tent", nameAr: "خيمة كبيرة", description: "A large tent for families and groups. It includes a private bathroom and comfortable seating.", descriptionAr: "خيمة كبيرة للعائلات والمجموعات. تحتوي على حمام خاص وجلسة مريحة.", location: "Sabhan, Kuwait", capacity: 8, price: 35, privateBathroom: true, mapArea: "Large tents area", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80" },
  { id: 3, type: "vip", name: "VIP Tent", nameAr: "خيمة VIP", description: "A premium tent with private bathroom, larger seating area, and a location near the theater and restaurants.", descriptionAr: "خيمة مميزة تحتوي على حمام خاص وجلسة أكبر وموقع قريب من المسرح والمطاعم.", location: "Sabhan, Kuwait", capacity: 12, price: 55, privateBathroom: true, mapArea: "VIP tents area", image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80" }
];
const demoUsers = [
  { id: 1, name: "Aisha", phone: "55775252", email: "aisha@test.com", password: "1234", role: "user" },
  { id: 2, name: "MOD Staff", phone: "55775252", email: "staff@mod.com", password: "admin123", role: "staff" }
];
const defaultBookings = [
  { id: 1001, userEmail: "aisha@test.com", name: "Aisha", phone: "55775252", tentId: 1, tentName: "Small Tent", date: "2026-05-02", people: 4, notes: "Test booking for Aisha", status: "Pending" },
  { id: 1002, userEmail: "aisha@test.com", name: "Aisha", phone: "55775252", tentId: 2, tentName: "Large Tent", date: "2026-05-05", people: 6, notes: "Family visit", status: "Confirmed" },
  { id: 1003, userEmail: "sara@test.com", name: "Sara", phone: "55550002", tentId: 3, tentName: "VIP Tent", date: "2026-05-08", people: 10, notes: "Birthday gathering", status: "Pending" }
];

function getMockBookings(){
  const stored = localStorage.getItem("mod_mock_bookings");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("mod_mock_bookings", JSON.stringify(defaultBookings));
  return defaultBookings;
}
function saveMockBookings(items){localStorage.setItem("mod_mock_bookings", JSON.stringify(items));}
function publicUser(user){const {password, ...safeUser}=user; return safeUser;}
function makeToken(user){return `mod-token-${user.role}-${user.id}-${Date.now()}`;}

export function getToken(){return localStorage.getItem("mod_token")||"";}
export function setToken(token){localStorage.setItem("mod_token",token);}
export function clearToken(){localStorage.removeItem("mod_token");localStorage.removeItem("mod_user");}
export function getUser(){try{return JSON.parse(localStorage.getItem("mod_user"));}catch{return null;}}
export function setUser(user){localStorage.setItem("mod_user",JSON.stringify(user));}
export function isLoggedIn(){return Boolean(getToken()&&getUser());}

function mockApi(path, options={}){
  const method = (options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  if (path === "/tents" && method === "GET") return mockTents;
  if (path === "/auth/login" && method === "POST") {
    const user = demoUsers.find(u => u.role === "user" && u.email.toLowerCase() === String(body.email).toLowerCase() && u.password === body.password);
    if (!user) throw new Error("Invalid email or password");
    return { token: makeToken(user), user: publicUser(user) };
  }
  if (path === "/auth/staff-login" && method === "POST") {
    const user = demoUsers.find(u => u.role === "staff" && u.email.toLowerCase() === String(body.email).toLowerCase() && u.password === body.password);
    if (!user) throw new Error("Invalid staff login");
    return { token: makeToken(user), user: publicUser(user) };
  }
  if (path === "/auth/register" && method === "POST") {
    const user = { id: Date.now(), name: body.name, phone: body.phone, email: body.email, role: "user" };
    return { token: makeToken(user), user };
  }
  if (path.startsWith("/bookings") && method === "GET") {
    const bookings = getMockBookings();
    const q = path.split("userEmail=")[1];
    return q ? bookings.filter(b => b.userEmail === decodeURIComponent(q)) : bookings;
  }
  if (path === "/bookings" && method === "POST") {
    const tent = mockTents.find(t => t.id === Number(body.tentId)) || mockTents[0];
    const booking = { id: Date.now(), userEmail: body.userEmail, name: body.name, phone: body.phone, tentId: tent.id, tentName: tent.name, date: body.date, people: Number(body.people), notes: body.notes || "", status: "Pending" };
    const bookings = [booking, ...getMockBookings()];
    saveMockBookings(bookings);
    return booking;
  }
  const statusMatch = path.match(/^\/bookings\/(\d+)\/status$/);
  if (statusMatch && method === "PATCH") {
    const bookings = getMockBookings();
    const id = Number(statusMatch[1]);
    const updated = bookings.map(b => b.id === id ? {...b, status: body.status} : b);
    saveMockBookings(updated);
    const booking = updated.find(b => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return booking;
  }
  const editMatch = path.match(/^\/bookings\/(\d+)$/);
  if (editMatch && method === "PATCH") {
    const bookings = getMockBookings();
    const id = Number(editMatch[1]);
    const updated = bookings.map(b => b.id === id ? {...b, date: body.date ?? b.date, people: body.people ? Number(body.people) : b.people, notes: body.notes ?? b.notes} : b);
    saveMockBookings(updated);
    const booking = updated.find(b => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return booking;
  }
  throw new Error("Request failed. Please run the backend server.");
}

export async function apiRequest(path, options={}){
  const headers={"Content-Type":"application/json",...(options.headers||{})};
  const token=getToken();
  if(token) headers.Authorization=`Bearer ${token}`;
  try{
    const res=await fetch(`${API_BASE}${path}`,{...options,headers});
    const data=await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.message||"Request failed");
    return data;
  }catch(error){
    return mockApi(path, options);
  }
}
