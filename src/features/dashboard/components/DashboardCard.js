import React from 'react';
import '../styles/DashboardCard.scss'; // <-- UPDATED PATH

const DashboardCard = ({ title, children, className = '' }) => {
  return (
    <div className={`dashboard-card clay-card ${className}`}>
      {title && <h3 className="dashboard-card__title">{title}</h3>}
      <div className="dashboard-card__content">{children}</div>
    </div>
  );
};

export default DashboardCard;