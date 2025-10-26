import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <LoadingOverlay />; // Wait for user to be loaded
  }

  // Redirect based on role
  if (user.role === 'admin') {
    return <Navigate to="/admin/overview" replace />;
  }
  
  // For 'owner' or 'tenant'
  return <Navigate to="/my-dashboard" replace />;
};

export default DashboardPage;