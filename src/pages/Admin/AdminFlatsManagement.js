// src/pages/Admin/AdminFlatsManagement.js

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/DataTable/DataTable';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
// Import fetchAdminData along with CRUD actions
import { addFlat, editFlat, removeFlat, fetchAdminData } from '../../features/admin/adminSlice';
import './AdminPages.scss'; // Styles for the admin page layout

// Define table columns
const flatColumns = [
  { header: 'Flat No.', accessor: 'flatNumber' },
  { header: 'Owner', accessor: 'owner' },
  { header: 'Status', accessor: 'status' },
];

// Define how many items to show per page
const ITEMS_PER_PAGE = 5;

const AdminFlatsManagement = () => {
  const dispatch = useDispatch();
  // Select necessary state slices from the Redux store (admin feature)
  const { flats, isLoading, isSubmitting, error } = useSelector(state => state.admin);

  // --- Component State ---
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const [editingFlat, setEditingFlat] = useState(null); // Stores the flat being edited (null if adding)
  const [formData, setFormData] = useState({ flatNumber: '', owner: '', status: 'Vacant' }); // State for the Add/Edit form
  const [currentPage, setCurrentPage] = useState(1); // State for current pagination page

  // --- Effect to Fetch Initial Data ---
  // Runs when the component mounts or when dependencies change
  useEffect(() => {
    // Fetch ONLY if flats is null/empty AND not currently loading AND no previous error
    if ((!flats || flats.length === 0) && !isLoading && !error) {
      console.log("[AdminFlatsManagement] useEffect: Dispatching fetchAdminData");
      dispatch(fetchAdminData()); // Fetch all admin data (includes flats)
    } else {
      console.log("[AdminFlatsManagement] useEffect: Skipping fetch.", { hasFlats: !!flats?.length, isLoading, hasError: !!error });
    }
  }, [dispatch, flats, isLoading, error]); // Dependencies for the effect

  // --- Effect to Manage Form State ---
  // Runs when the modal opens/closes or the flat being edited changes
  useEffect(() => {
    if (isModalOpen) {
      if (editingFlat) {
        // Edit mode: Pre-fill the form
        setFormData({
          flatNumber: editingFlat.flatNumber || '',
          owner: editingFlat.owner || '',
          status: editingFlat.status || 'Vacant',
        });
      } else {
        // Add mode: Reset the form
        setFormData({ flatNumber: '', owner: '', status: 'Vacant' });
      }
    }
  }, [isModalOpen, editingFlat]);

  // --- Event Handlers ---

  // Updates form state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Opens modal in "Add" mode
  const handleOpenAddModal = () => {
    setEditingFlat(null);
    setIsModalOpen(true);
  };

  // Opens modal in "Edit" mode
  const handleOpenEditModal = (flat) => {
    setEditingFlat(flat);
    setIsModalOpen(true);
  };

  // Handles delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flat?')) {
      dispatch(removeFlat(id));
      // Optional: Adjust page if last item deleted
      if (currentTableData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Handles form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.flatNumber || !formData.owner) {
      alert("Flat Number and Owner fields are required.");
      return;
    }

    let actionResult;
    if (editingFlat) {
      actionResult = await dispatch(editFlat({ id: editingFlat.id, data: formData }));
    } else {
      actionResult = await dispatch(addFlat(formData));
    }

    // Close modal on success
    if (editFlat.fulfilled.match(actionResult) || addFlat.fulfilled.match(actionResult)) {
      setIsModalOpen(false);
      // Optional: Go to last page after adding
      if (!editingFlat) {
         const totalItems = (flats?.length || 0) + 1;
         const newTotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
         if (newTotalPages > currentPage) {
             setCurrentPage(newTotalPages);
         }
      }
    }
  };

  // --- Pagination Logic ---
  const currentTableData = useMemo(() => {
    if (!Array.isArray(flats)) return [];
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    console.log(`[AdminFlatsManagement] Slicing flats for page ${currentPage}:`, flats?.slice(firstPageIndex, lastPageIndex)); // Debug Log
    return flats.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, flats]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- Actions Column Renderer ---
  const renderActions = (flat) => (
    <>
      <Button variant="secondary" onClick={() => handleOpenEditModal(flat)} disabled={isSubmitting}>Edit</Button>
      <Button variant="danger" onClick={() => handleDelete(flat.id)} disabled={isSubmitting}>Delete</Button>
    </>
  );

  // --- Loading State ---
  // Show spinner ONLY during initial load when flats are empty
  if (isLoading && (!flats || flats.length === 0)) {
     console.log("[AdminFlatsManagement] Rendering: Spinner (Initial Load)");
     return (
        <div className="admin-page dashboard-loading">
            <Spinner text="Loading flats..." />
        </div>
     );
  }

  // --- Error State ---
   if (error && !isLoading && (!flats || flats.length === 0)) {
     console.error("[AdminFlatsManagement] Rendering: Initial Load Error", error);
     return <div className="admin-page dashboard-error"><p>Error loading flats: {error}</p></div>;
  }

  // --- Main Content Rendering ---
  console.log("[AdminFlatsManagement] Rendering: Content", { totalFlats: flats?.length, currentPageDataCount: currentTableData.length });
  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1>Flat Management</h1>
        <Button onClick={handleOpenAddModal} disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Add New Flat'}
        </Button>
      </div>

      {/* CUD Errors */}
      {error && isSubmitting && <p className="error-message">Error saving data: {error}</p>}

      {/* Data Table */}
      <DataTable
        columns={flatColumns}
        data={currentTableData} // Pass paginated data
        actions={renderActions}
        currentPage={currentPage}
        totalItems={flats?.length || 0} // Total count for pagination
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingFlat ? `Edit Flat (${editingFlat.flatNumber})` : 'Add New Flat'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Flat Number */}
          <div className="form-group">
            <label htmlFor="flatNumber">Flat Number (e.g., A-101)</label>
            <input type="text" id="flatNumber" name="flatNumber" value={formData.flatNumber} onChange={handleInputChange} required disabled={!!editingFlat} />
          </div>
          {/* Owner Name */}
          <div className="form-group">
            <label htmlFor="owner">Owner Name</label>
            <input type="text" id="owner" name="owner" value={formData.owner} onChange={handleInputChange} required />
          </div>
          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Occupied">Occupied</option>
              <option value="Tenant-Occupied">Tenant-Occupied</option>
              <option value="Vacant">Vacant</option>
            </select>
          </div>
          {/* Submit */}
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (editingFlat ? 'Update Flat' : 'Save Flat')}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFlatsManagement;