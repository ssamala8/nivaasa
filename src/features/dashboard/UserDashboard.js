import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from './dashboardSlice';
import DashboardCard from './components/DashboardCard';
import PaymentStatusCard from './components/PaymentStatusCard';
import AlertsFeed from './components/AlertsFeed';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { data, isLoading, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    if (user?.role) {
      dispatch(fetchDashboardData(user.role));
    }
  }, [user, dispatch]);

  if (isLoading || !data) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">Error: {error}</div>;
  }
  
  // Owner & Tenant share a similar view, but data will be different
  return (
    <>
      <div className="dashboard-grid__main">
        <PaymentStatusCard status={data.paymentStatus} dueDate={data.paymentDueDate} />
      </div>
      <div className="dashboard-grid__side">
        <DashboardCard title="My Flat">{data.flatNumber}</DashboardCard>
        <AlertsFeed alerts={data.alerts} />
        {/* (Polls component would go here) */}
      </div>
    </>
  );
};

export default UserDashboard;