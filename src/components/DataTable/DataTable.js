import React from 'react';
import './DataTable.scss';

/**
 * A reusable data table component.
 * @param {Array} columns - Array of column config { header: 'Name', accessor: 'name' }
 * @param {Array} data - Array of data objects
 */
const DataTable = ({ columns, data }) => {
  return (
    <div className="data-table-wrapper clay-card">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.accessor} data-label={col.header}>
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;