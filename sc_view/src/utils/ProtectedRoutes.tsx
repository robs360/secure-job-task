import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // logged in but not admin
    return <Navigate to="/" replace />;
  }

  return children; // admin → allowed
};

export default ProtectedRoute;
