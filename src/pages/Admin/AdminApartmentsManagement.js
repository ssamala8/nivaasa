// src/pages/Admin/AdminApartmentsManagement.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminData } from '../../features/admin/adminSlice'; // Action to potentially fetch data
import Spinner from '../../components/Spinner/Spinner';
import DashboardCard from '../../features/dashboard/components/DashboardCard';
import './AdminPages.scss'; // Ensure styles are imported

const AdminApartmentsManagement = () => {
  const dispatch = useDispatch();
  // Select required data from Redux
  const { apartments, isLoading, error, stats } = useSelector(state => state.admin);

  // Fetch data if apartments array is empty/null and not currently loading
  useEffect(() => {
    // Check 'stats' too, as fetchAdminData loads everything. Only fetch if initial load hasn't happened.
    if (stats === null && !isLoading && !error) {
      console.log("[AdminApartmentsManagement] useEffect: Dispatching fetchAdminData");
      dispatch(fetchAdminData());
    }
  }, [dispatch, apartments, isLoading, error, stats]); // Correct dependencies

  // --- Loading State ---
  // Show spinner if loading AND apartments haven't loaded yet
  if (isLoading && (!apartments || apartments.length === 0)) {
    return (
      <div className="admin-page dashboard-loading">
        <Spinner text="Loading Apartments..." />
      </div>
    );
  }

  // --- Error State ---
  if (error && !isLoading && (!apartments || apartments.length === 0)) {
    return <div className="admin-page dashboard-error"><p>Error loading apartments: {error}</p></div>;
  }

  // --- Render Content ---
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Apartment Management</h1>
        {/* <Button>Add New Apartment</Button> */}
      </div>

      {/* Display errors that occurred AFTER initial load (e.g., during CUD) */}
      {error && !isLoading && <p className="error-message">Error: {error}</p>}

      {/* Check if apartments data exists and is an array */}
      {Array.isArray(apartments) && apartments.length > 0 ? (
        <div className="apartments-list"> {/* Use the class for grid layout */}
          {apartments.map(apt => (
            // Display each apartment in a card
            <DashboardCard key={apt.id} title={apt.name} className="apartment-card">
              <p><strong>Location:</strong> {apt.location}</p>
              <p><strong>Total Flats:</strong> {apt.totalFlats}</p>
              <p><strong>Occupancy:</strong> {apt.occupancy}</p>
              {/* Add Edit/Delete buttons here later if needed */}
            </DashboardCard>
          ))}
        </div>
      ) : (
         // Show message if loading is done but no apartments found
         !isLoading && <p>No apartment data available.</p>
      )}
    </div>
  );
};

export default AdminApartmentsManagement;