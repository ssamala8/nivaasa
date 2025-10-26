import React from 'react';
import { useSelector } from 'react-redux';
import UserDashboard from '../../features/dashboard/UserDashboard';
import './UserDashboardPage.scss'; // We'll move the styles

const UserDashboardPage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="dashboard-page">
      <div className="welcome-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Here is your overview for today.</p>
      </div>

      <div className="dashboard-grid">
        <UserDashboard />
      </div>
    </div>
  );
};

export default UserDashboardPage;