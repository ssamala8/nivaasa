import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminLayout.scss';
// No need for FontAwesomeIcon or useState here anymore

const AdminLayout = () => {
  return (
    // No dynamic class needed here
    <div className="admin-layout">
      {/* Sidebar doesn't need props */}
      <Sidebar />
      <main className="admin-content">
        {/* No mobile toggle button needed in content */}
        <Outlet />
      </main>
      {/* No mobile overlay needed */}
    </div>
  );
};

export default AdminLayout;