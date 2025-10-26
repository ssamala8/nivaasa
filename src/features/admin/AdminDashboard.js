// src/features/admin/AdminDashboard.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Correct import order
// Removed unused 'fetchAdminData' - Parent triggers fetch
import Spinner from '../../components/Spinner/Spinner';

// --- REMOVED unused imports ---
// import DataTable from '../../components/DataTable/DataTable';
// import DashboardCard from '../dashboard/components/DashboardCard';

// --- CORRECTED IMPORT PATHS ---
import AdminStatsWidget from './components/AdminStatsWidget';
import PaymentSummaryChart from './components/PaymentSummaryChart';
import FlatPaymentStatusList from './components/FlatPaymentStatusList';
import RecentQueriesWidget from './components/RecentQueriesWidget';

// --- REMOVED unused column definitions ---
// const flatColumns = [ /* ... */ ];
// const apartmentColumns = [ /* ... */ ];

const AdminDashboard = () => {
  // Select state slices needed for the widgets
  const { stats, payments, queries, isLoading, error } = useSelector(state => state.admin);
  // No dispatch needed here if parent triggers fetch

  // --- 1. Show Spinner ---
  if (isLoading) {
    console.log("[AdminDashboard] Rendering: Spinner");
    return (
      <div className="dashboard-loading">
        <Spinner text="Loading Admin Panel..." />
      </div>
    );
  }

  // --- 2. Show Error ---
  if (error && !isLoading) {
    console.error("[AdminDashboard] Rendering: Error state:", error);
    return <div className="dashboard-error">Error loading data: {error}</div>;
  }

  // --- 3. Show Content ---
  // Render ONLY if loading is finished, no error, AND stats exists
  if (!isLoading && !error && stats) {
    console.log("[AdminDashboard] Rendering: Content");
    return (
      <div className="admin-overview-grid">
        {/* Row 1 */}
        <div className="overview-span-2">
          <AdminStatsWidget stats={stats} />
        </div>

        {/* Row 2 */}
        <PaymentSummaryChart payments={payments || []} totalFlats={stats.totalFlats || 0} />
        <FlatPaymentStatusList payments={payments || []} />

        {/* Row 3 */}
        <div className="overview-span-2">
          <RecentQueriesWidget queries={queries || []} />
        </div>
      </div>
    );
  }

  // --- 4. Fallback ---
  console.warn("[AdminDashboard] Rendering: Fallback! State:", { isLoading, error, stats });
  return <div className="dashboard-error">Could not display admin dashboard content.</div>;
};

export default AdminDashboard;