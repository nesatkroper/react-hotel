import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import React from "react";
import useOnlineStatus from "@/components/app/connection/use-online-status";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const isOnline = useOnlineStatus();

  if (!isOnline) return <Navigate to="/offline" />;

  if (!token) return <Navigate to="/auth" />;

  return <Outlet />;
};
