// src/pages/Admin/AdminUsersManagement.js

import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/DataTable/DataTable';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import { addUser, editUser, removeUser } from '../../features/admin/adminSlice';
import './AdminPages.scss';

// Define table columns
const userColumns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Role', accessor: 'role' },
  { header: 'Flat', accessor: 'flat' },
];

// --- Pagination Settings ---
const ITEMS_PER_PAGE = 5; // Set items per page for users

const AdminUsersManagement = () => {
  const dispatch = useDispatch();
  // Ensure 'users' is selected correctly from the admin slice
  const { users, flats, isLoading, isSubmitting, error } = useSelector(state => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  // --- Add Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);

  // Form state
  const initialFormState = { name: '', email: '', password: '', role: 'owner', flat: flats?.[0]?.flatNumber || '' };
  const [formData, setFormData] = useState(initialFormState);

  // Effect to populate/clear form
  useEffect(() => {
    if (isModalOpen) {
      if (editingUser) {
        setFormData({
          name: editingUser.name || '',
          email: editingUser.email || '',
          password: '', // Don't pre-fill password
          role: editingUser.role || 'owner',
          flat: editingUser.flat || (flats?.[0]?.flatNumber || ''),
        });
      } else {
         setFormData({ ...initialFormState, flat: flats?.[0]?.flatNumber || '' });
      }
    }
    // Reset page to 1 when modal closes or data changes significantly (optional)
    // setCurrentPage(1);
  }, [isModalOpen, editingUser, flats]); // Add flats dependency

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Modal handlers
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(removeUser(id));
      // Reset to page 1 if the last item on a page is deleted (optional enhancement)
      if (currentTableData.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!editingUser && !formData.password)) {
      alert("Name, Email, and Password (for new users) are required.");
      return;
    }

    let actionResult;
    if (editingUser) {
      const updateData = { ...formData };
      if (!updateData.password) { delete updateData.password; }
      actionResult = await dispatch(editUser({ id: editingUser.id, data: updateData }));
    } else {
      actionResult = await dispatch(addUser(formData));
    }

    if (editUser.fulfilled.match(actionResult) || addUser.fulfilled.match(actionResult)) {
        setIsModalOpen(false);
        // Go to the last page after adding a new user (optional enhancement)
        // const totalUsers = users?.length || 0;
        // const newTotalPages = Math.ceil((totalUsers + 1) / ITEMS_PER_PAGE);
        // if (!editingUser && newTotalPages > currentPage) setCurrentPage(newTotalPages);
    }
  };

  // Actions column renderer
  const renderActions = (user) => (
    <>
      <Button variant="secondary" onClick={() => handleOpenEditModal(user)} disabled={isSubmitting}>Edit</Button>
      <Button variant="danger" onClick={() => handleDelete(user.id)} disabled={isSubmitting}>Delete</Button>
    </>
  );

  // --- Calculate data for the current page ---
  const currentTableData = useMemo(() => {
    if (!users) return [];
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]); // Recalculate only when page or users change

  // --- Handle page change ---
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  // Show loading spinner if initial data is loading and users aren't available yet
  if (isLoading && (!users || users.length === 0)) return <Spinner text="Loading users..." />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>User Management</h1>
        <Button onClick={handleOpenAddModal} disabled={isSubmitting}>Add New User</Button>
      </div>

       {error && <p className="error-message">Error: {error}</p>}

      {/* --- Pass Pagination Props to DataTable --- */}
      <DataTable
        columns={userColumns}
        data={currentTableData} // Pass sliced user data
        actions={renderActions}
        currentPage={currentPage}
        totalItems={users?.length || 0} // Total users from Redux
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange} // Pass handler
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password {editingUser ? '(Leave blank to keep current)' : ''}</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required={!editingUser} />
          </div>
           {/* Role Select */}
           <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Flat Select */}
           <div className="form-group">
            <label htmlFor="flat">Assign to Flat</label>
             <select id="flat" name="flat" value={formData.flat} onChange={handleInputChange}>
              <option value="">-- Select Flat --</option>
              {/* Map over flats fetched in adminSlice */}
              {flats?.map(flat => (
                <option key={flat.id} value={flat.flatNumber}>{flat.flatNumber} ({flat.owner})</option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <Button type="submit" variant="primary" disabled={isSubmitting}>
             {isSubmitting ? 'Saving...' : (editingUser ? 'Update User' : 'Save User')}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUsersManagement;