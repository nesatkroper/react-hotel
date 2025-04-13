import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import React, { useEffect } from "react";
import useOnlineStatus from "@/hooks/use-online-status";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const isOnline = useOnlineStatus();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOnline) {
      localStorage.setItem("lastRoute", location.pathname);
      navigate("/offline", { replace: true });
    }
  }, [isOnline, location.pathname, navigate]);

  if (!token) return <Navigate to='/admin/auth' />;

  return <Outlet />;
};
