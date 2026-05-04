import { Navigate } from "react-router-dom";
import { getUser, isLoggedIn } from "../services/api.js";
function ProtectedRoute({children,staffOnly=false}){
 const user=getUser();
 if(!isLoggedIn()) return <Navigate to={staffOnly?"/staff-login":"/login"} replace/>;
 if(staffOnly&&user?.role!=="staff") return <Navigate to="/staff-login" replace/>;
 return children;
}
export default ProtectedRoute;
