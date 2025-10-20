import React from 'react';
import DashboardCard from './DashboardCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/PaymentStatusCard.scss'; // <-- ADD THIS LINE

const PaymentStatusCard = ({ status, dueDate }) => {
  const isPending = status === 'Pending';
  return (
    <DashboardCard
      title="Monthly Maintenance"
      className={`payment-card ${isPending ? 'payment-card--pending' : 'payment-card--paid'}`}
    >
      <div className="payment-status">
        <FontAwesomeIcon icon={isPending ? faExclamationCircle : faCheckCircle} className="status-icon" />
        <div className="status-text">
          <h4>Status: {status}</h4>
          {isPending && <p>Due Date: {dueDate}</p>}
        </div>
      </div>
      {isPending && <button className="pay-now-button">Pay Now</button>}
    </DashboardCard>
  );
};

export default PaymentStatusCard;