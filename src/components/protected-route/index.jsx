import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ redirectPath = "/auth/login", children }) {
  const token = Cookies.get("token");
  const tokenExpireTime = Cookies.get("tokenExpireTime");

  if (!token || (tokenExpireTime && tokenExpireTime < Date.now())) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
