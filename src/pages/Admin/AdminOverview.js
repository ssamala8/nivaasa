// src/pages/Admin/AdminOverview.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../../features/admin/adminSlice';
import AdminDashboard from '../../features/admin/AdminDashboard'; // Display component

const AdminOverview = () => {
  const dispatch = useDispatch();
  // Select state needed to decide *if* we need to fetch
  const { isLoading, stats, error } = useSelector(state => state.admin);

  useEffect(() => {
    // Fetch ONLY if stats is null (not loaded) AND not currently loading AND no previous error
    // This prevents unnecessary re-fetching if data is already present
    if (stats === null && !isLoading && !error) {
      console.log("[AdminOverview] useEffect: Dispatching fetchAdminData");
      dispatch(fetchAdminData());
    } else {
       console.log("[AdminOverview] useEffect: Skipping fetch.", { hasStats: !!stats, isLoading, hasError: !!error });
    }
  }, [dispatch, stats, isLoading, error]); // Dependencies

  return (
    <div>
      <h1>Admin Overview</h1>
      {/* AdminDashboard handles showing spinner/error/content */}
      <AdminDashboard />
    </div>
  );
};

export default AdminOverview;