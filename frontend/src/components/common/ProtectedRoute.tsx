import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../core/hooks/useAuth";
import { PathRoutes } from "../../core/lib/Menu";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={PathRoutes.HOME} />;
};

