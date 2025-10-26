import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // New: Check for a specific role if required
  if (role && user.role !== role) {
    // If user is not an admin, send them to their own dashboard
    return <Navigate to="/my-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;