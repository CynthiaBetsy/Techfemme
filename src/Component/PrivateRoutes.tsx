// Component/PrivateRoutes.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../Component/Context/useAuth";

interface PrivateRouteProps {
  children: React.ReactElement;
  adminOnly?: boolean;           
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  adminOnly = false,             
}) => {
  const { user } = useAuth();     

  // Not logged in?
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If route is admin‑only but user isn’t an admin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
