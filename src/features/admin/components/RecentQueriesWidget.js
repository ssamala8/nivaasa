// src/features/admin/components/RecentQueriesWidget.js
import React from 'react';
import DashboardCard from '../../dashboard/components/DashboardCard';
import { Link } from 'react-router-dom'; // Keep Link
import './AdminWidgets.scss';

const RecentQueriesWidget = ({ queries = [] }) => {
  // Helper function to determine status class
  const getStatusClass = (status = '') => {
      return `status-${status.toLowerCase().replace(/\s+/g, '-')}`; // e.g., status-in-progress
  }

  return (
    <DashboardCard title="Recent Queries / Issues" className="queries-widget">
       <ul className="query-list">
         {queries && queries.length > 0 ? (
           // Show only the top few queries (e.g., 3 or 4)
           queries.slice(0, 4).map(q => (
             <li key={q.id} className={`query-item ${getStatusClass(q.status)}`}>
               <span className="query-flat">{q.flatNumber}:</span>
               <span className="query-subject">{q.subject}</span>
               {/* Display date nicely */}
               <span className="query-date">{new Date(q.date).toLocaleDateString('en-IN')}</span>
               <span className={`query-status ${getStatusClass(q.status)}`}>{q.status}</span>
             </li>
           ))
         ) : (
           <li className="empty-state">No recent queries found.</li>
         )}
       </ul>
       {/* Link to a future full queries page */}
       {queries && queries.length > 0 && (
          <Link to="/admin/queries" className="view-all-link">View All Queries</Link>
       )}
    </DashboardCard>
  );
};

export default RecentQueriesWidget;