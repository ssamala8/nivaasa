import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faBuilding, faUsers,
  faFileInvoiceDollar, faBullhorn
  // No faTimes needed
} from '@fortawesome/free-solid-svg-icons';
import './AdminLayout.scss';

// No props needed
const Sidebar = () => {
  return (
    // No dynamic class needed
    <nav className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        {/* No close button */}
      </div>
      <ul className="sidebar-nav">
        {/* Remove onClick handlers */}
        <li>
          <NavLink to="/admin/overview">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/flats">
            <FontAwesomeIcon icon={faBuilding} />
            <span>Flat Management</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <FontAwesomeIcon icon={faUsers} />
            <span>User Management</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments">
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
            <span>Payments</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/community">
            <FontAwesomeIcon icon={faBullhorn} />
            <span>Community</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;