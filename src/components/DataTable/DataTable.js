// src/components/DataTable/DataTable.js
import React from 'react';
import Pagination from '../Pagination/Pagination'; // Ensure Pagination component exists and is imported
import './DataTable.scss'; // Ensure styles exist and are imported

/**
 * Reusable data table component with Pagination.
 * Parent component is responsible for slicing data.
 * @param {Array} columns - Array of column config { header: 'Name', accessor: 'name' }
 * @param {Array} data - Array of data objects FOR THE CURRENT PAGE
 * @param {Function} actions - Optional: (row) => JSX | Renders action buttons for a row
 * @param {number} currentPage - Current active page number
 * @param {number} totalItems - Total number of items across ALL pages
 * @param {number} itemsPerPage - Number of items per page
 * @param {Function} onPageChange - Function to call when page changes (passes new page number)
 */
const DataTable = ({
  columns,
  data,
  actions,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {

  // Determine if pagination should be shown
  const showPagination = totalItems > itemsPerPage;

  // Log the data received by the component for debugging
  // console.log("[DataTable] Rendering with data prop:", data);

  return (
    // Container for both table wrapper and pagination
    <div className="data-table-container">
      {/* Wrapper for the table itself, allows overflow scrolling */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {/* Map over column definitions to create table headers */}
              {columns.map((col) => (
                // Use accessor or header as key for stability
                <th key={col.accessor || col.header}>{col.header}</th>
              ))}
              {/* Add an "Actions" header only if an actions function is provided */}
              {actions && <th className="actions-column-header">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {/* Check if data is a valid array and contains items */}
            {Array.isArray(data) && data.length > 0 ? (
              // Map over the data for the current page to create table rows
              data.map((row, rowIndex) => {
                // console.log(`[DataTable] Processing Row ${rowIndex}:`, row); // Optional: Log each row object
                return (
                  // Use a unique ID from the row data if available, otherwise fallback
                  <tr key={row.id || `row-${rowIndex}`}>
                    {/* Map over columns again to create cells (td) for the current row */}
                    {columns.map((col, colIndex) => {
                      // Get the value from the row object using the column's accessor key
                      const cellValue = row[col.accessor];
                      // console.log(`[DataTable] Row ${rowIndex}, Col ${col.accessor}:`, cellValue); // Optional: Log the specific cell value
                      return (
                        <td key={col.accessor || `col-${colIndex}`} data-label={col.header}>
                          {/* Render the cell value */}
                          {/* Convert value to string; show '-' if null or undefined */}
                          {cellValue !== undefined && cellValue !== null ? String(cellValue) : '-'}
                        </td>
                      );
                    })}
                    {/* If actions function is provided, render the actions cell */}
                    {actions && (
                      <td className="actions-column" data-label="Actions">
                        <div className="action-buttons">
                          {/* Call the actions function, passing the current row data */}
                          {actions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              // If data is empty or not an array, render the empty state row
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-state">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render the Pagination component if showPagination is true */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default DataTable;