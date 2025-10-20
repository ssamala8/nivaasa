import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from './adminSlice';
import DataTable from '../../components/DataTable/DataTable';
import DashboardCard from '../dashboard/components/DashboardCard';
import Spinner from '../../components/Spinner/Spinner'; // <-- 1. Import Spinner

// Define columns for our reusable table
const flatColumns = [
  { header: 'Flat No.', accessor: 'flatNumber' },
  { header: 'Owner', accessor: 'owner' },
  { header: 'Status', accessor: 'status' },
];

const apartmentColumns = [
  { header: 'Society Name', accessor: 'name' },
  { header: 'Location', accessor: 'location' },
  { header: 'Total Flats', accessor: 'totalFlats' },
  { header: 'Occupancy', accessor: 'occupancy' },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, apartments, flats, isLoading, error } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  // --- 2. THIS IS THE FIX ---
  // We replace the text with the Spinner component
  if (isLoading || !stats) {
    return (
      <div className="dashboard-loading">
        <Spinner text="Loading Admin Panel..." />
      </div>
    );
  }

  if (error) {
    return <div className="dashboard-error">Error: {error}</div>;
  }

  return (
    <>
      <div className="dashboard-grid__full">
        <DashboardCard title="Admin Statistics">
          <div className="admin-stats">
            <span>Total Societies: <strong>{stats.totalSocieties}</strong></span>
            <span>Total Flats: <strong>{stats.totalFlats}</strong></span>
            <span>Total Residents: <strong>{stats.totalResidents}</strong></span>
            <span>Payments Pending: <strong>{stats.paymentsPending}</strong></span>
          </div>
        </DashboardCard>
      </div>
      
      <div className="dashboard-grid__full">
        <DataTable columns={apartmentColumns} data={apartments} />
      </div>

      <div className="dashboard-grid__full">
        <DataTable columns={flatColumns} data={flats} />
      </div>
    </>
  );
};

export default AdminDashboard;