// src/features/admin/components/AdminStatsWidget.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import DashboardCard from '../../dashboard/components/DashboardCard';
import './AdminWidgets.scss';

const AdminStatsWidget = ({ stats }) => {
  if (!stats) {
     return (
       <DashboardCard title="Admin Statistics" className="admin-stats-widget">
         <p>Loading stats...</p>
       </DashboardCard>
     );
  }

  // Define target links for each stat
  const links = {
    societies: '/admin/apartments', // Link to a future apartment/society management page
    flats: '/admin/flats',
    residents: '/admin/users',
    pendingPayments: '/admin/payments'
  };

  return (
    <DashboardCard title="Admin Statistics" className="admin-stats-widget">
      <div className="stats-grid">

        {/* Total Societies Link */}
        <Link to={links.societies} className="stat-item-link">
          <div className="stat-item">
            <span className="stat-label">Total Societies</span>
            <strong className="stat-value">{stats.totalSocieties}</strong>
          </div>
        </Link>

        {/* Total Flats Link */}
        <Link to={links.flats} className="stat-item-link">
          <div className="stat-item">
            <span className="stat-label">Total Flats</span>
            <strong className="stat-value">{stats.totalFlats}</strong>
          </div>
        </Link>

        {/* Total Residents Link */}
        <Link to={links.residents} className="stat-item-link">
          <div className="stat-item">
            <span className="stat-label">Total Residents</span>
            <strong className="stat-value">{stats.totalResidents}</strong>
          </div>
        </Link>

        {/* Payments Pending Link */}
        <Link to={links.pendingPayments} className="stat-item-link">
          <div className="stat-item">
            <span className="stat-label">Payments Pending</span>
            <strong className="stat-value stat-value--warning">{stats.paymentsPending}</strong>
          </div>
        </Link>

      </div>
    </DashboardCard>
  );
};
export default AdminStatsWidget;