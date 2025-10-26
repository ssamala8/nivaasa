// src/features/admin/components/FlatPaymentStatusList.js
import React from 'react';
import DashboardCard from '../../dashboard/components/DashboardCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './AdminWidgets.scss';

const FlatPaymentStatusList = ({ payments = [] }) => {
  // Helper to get icon and class based on status
  const getStatusDetails = (status) => {
    switch (status) {
      case 'Paid': return { icon: faCheckCircle, className: 'paid' };
      case 'Pending': return { icon: faExclamationCircle, className: 'pending' };
      default: return { icon: faQuestionCircle, className: 'na' }; // For N/A
    }
  };

  return (
    <DashboardCard title="Flat Payment Details (Current Month)" className="payment-list-widget">
      <ul className="payment-list">
        {payments && payments.length > 0 ? (
          payments.map(p => {
             const statusDetails = getStatusDetails(p.status);
             return (
               <li key={p.id} className={`payment-item status-${statusDetails.className}`}>
                 <span className="flat-number">{p.flatNumber}</span>
                 <span className="payment-amount">Amt: {p.amount > 0 ? `₹${p.amount}` : '-'}</span>
                 <span className="payment-status-indicator">
                   <FontAwesomeIcon icon={statusDetails.icon} className="status-icon" />
                   {p.status}
                 </span>
               </li>
             );
          })
        ) : (
          <li className="empty-state">No payment data available for this month.</li>
        )}
      </ul>
    </DashboardCard>
  );
};

export default FlatPaymentStatusList;