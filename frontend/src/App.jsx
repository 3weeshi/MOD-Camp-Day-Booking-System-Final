import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { LanguageProvider } from "./components/LanguageContext.jsx";
import AssistantPage from "./pages/AssistantPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import InstructionsPage from "./pages/InstructionsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StaffDashboardPage from "./pages/StaffDashboardPage.jsx";
import StaffLoginPage from "./pages/StaffLoginPage.jsx";
function App(){return <LanguageProvider><Navbar/><main className="container"><Routes>
<Route path="/" element={<HomePage/>}/>
<Route path="/login" element={<LoginPage/>}/>
<Route path="/register" element={<RegisterPage/>}/>
<Route path="/staff-login" element={<StaffLoginPage/>}/>
<Route path="/instructions" element={<InstructionsPage/>}/>
<Route path="/map" element={<MapPage/>}/>
<Route path="/assistant" element={<AssistantPage/>}/>
<Route path="/contact" element={<ContactPage/>}/>
<Route path="/book" element={<ProtectedRoute><BookingPage/></ProtectedRoute>}/>
<Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
<Route path="/confirmation" element={<ProtectedRoute><ConfirmationPage/></ProtectedRoute>}/>
<Route path="/staff-dashboard" element={<ProtectedRoute staffOnly><StaffDashboardPage/></ProtectedRoute>}/>
<Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></main></LanguageProvider>;}
export default App;
