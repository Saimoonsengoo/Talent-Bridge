import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // redirect based on role
      if (user.role === "recruiter") navigate("/admin");
      else if (user.role === "admin") navigate("/superadmin/dashboard");
      else navigate("/");
    }
  }, [user, loading, navigate, allowedRoles]);

  if (loading) return null;

  return children;
};

export default ProtectedRoute;

