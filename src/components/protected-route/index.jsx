import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function ProtectedRoute({ redirectPath = "/auth/login", children }) {
  const token = Cookies.get("token");

  const isTokenValid = () => {
    if (!token) {
      console.log("token doesn't exist");
      return false;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log("token expiration date", decodedToken.exp);
    console.log("current time", currentTime);

    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  };

  return isTokenValid() ? children || <Outlet /> : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
