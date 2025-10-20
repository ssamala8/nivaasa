import React from 'react';
import { useSelector } from 'react-redux';
import './DashboardPage.scss';

// Import our two different dashboard views
import UserDashboard from '../../features/dashboard/UserDashboard';
import AdminDashboard from '../../features/admin/AdminDashboard';

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="dashboard-page">
      <div className="welcome-header">
        <h1>Welcome, {user?.name}!</h1>
        {user?.role === 'admin' ? (
          <p>Welcome to the Admin Management Panel.</p>
        ) : (
          <p>Here is your overview for today.</p>
        )}
      </div>

      <div className="dashboard-grid">
        {user?.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <UserDashboard /> 
          // This will show for 'owner' or 'tenant'
        )}
      </div>
    </div>
  );
};

export default DashboardPage;