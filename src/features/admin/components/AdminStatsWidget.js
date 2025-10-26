// src/features/admin/components/AdminStatsWidget.js
import React from 'react';
import DashboardCard from '../../dashboard/components/DashboardCard'; // Re-use the generic card
import './AdminWidgets.scss'; // Shared style file

const AdminStatsWidget = ({ stats }) => {
  // Show a simple loading state or return null if stats aren't ready
  if (!stats) {
     return (
       <DashboardCard title="Admin Statistics" className="admin-stats-widget">
         <p>Loading stats...</p>
       </DashboardCard>
     );
  }

  return (
    <DashboardCard title="Admin Statistics" className="admin-stats-widget">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Total Societies</span>
          <strong className="stat-value">{stats.totalSocieties}</strong>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Flats</span>
          <strong className="stat-value">{stats.totalFlats}</strong>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Residents</span>
          <strong className="stat-value">{stats.totalResidents}</strong>
        </div>
        <div className="stat-item">
          <span className="stat-label">Payments Pending</span>
          <strong className="stat-value stat-value--warning">{stats.paymentsPending}</strong>
        </div>
      </div>
    </DashboardCard>
  );
};
export default AdminStatsWidget;