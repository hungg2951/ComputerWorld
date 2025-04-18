import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, checkToken } from "../../ultis/isAuthenticated";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/loading";

const ProtectedRoute = ({ children }) => {
  const [currenUser, setCurrenUser] = useState(null);
  const [token, setToken] = useState(isAuthenticated());
  const navigation = useNavigate()
  useEffect(() => {
    if (!token) {
      return navigation("/")
    }
    if (checkToken()) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role) {
          setCurrenUser(decoded.role);
        } else {
          return <Navigate to="/" replace />;
        }
      } catch (error) {
        return <Navigate to="/" replace />;
      }
    }
  }, [token]);

  if (currenUser === null) {
    return <Loading/>
  }

  if (!checkToken() || currenUser !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
