import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function AuthRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}