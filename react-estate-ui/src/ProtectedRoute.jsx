import { Navigate, Outlet, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
