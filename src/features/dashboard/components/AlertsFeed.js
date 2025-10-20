import React from 'react';
import DashboardCard from './DashboardCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../styles/AlertsFeed.scss'; // <-- ADD THIS LINE

const AlertsFeed = ({ alerts }) => {
  return (
    <DashboardCard title="Alerts & Notices" className="alerts-feed">
      <ul>
        {alerts.map(alert => (
          <li key={alert.id}>
            <FontAwesomeIcon icon={faBell} className="alert-icon" />
            <span>{alert.message}</span>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default AlertsFeed;