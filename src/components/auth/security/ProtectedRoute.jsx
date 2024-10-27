import React from "react";
import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../../../helpers/GetToken";

export const ProtectedRoute = ({ Component, Roles }) => {
  const auth = getToken();
  return auth == null ? (
    <Navigate to="/login" />
  ) : getRole() == Roles ? (
    <Component />
  ) : (
    <Navigate to="/401" />
  );
};

export default ProtectedRoute;
