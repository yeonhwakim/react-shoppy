import React from "react";
import { Navigate } from "react-router-dom";

import { useFirebase } from "../context/LoginContext";

function ProtectedRoute({ children, adminRequired }) {
  const { user } = useFirebase();

  if (!user || (adminRequired && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
