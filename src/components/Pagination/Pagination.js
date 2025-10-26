import React from 'react';
import './Pagination.scss';

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxPagesToShow = 5 // Max page numbers to show directly (e.g., 1 ... 4 5 6 ... 10)
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
      return; // Do nothing if invalid or current page
    }
    onPageChange(pageNumber);
  };

  // --- Logic to determine which page numbers to display ---
  let startPage, endPage;
  if (totalPages <= maxPagesToShow) {
    // Show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculate start and end pages with ellipsis logic
    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrent) {
      // Near the start
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
      // Near the end
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      // In the middle
      startPage = currentPage - maxPagesBeforeCurrent;
      endPage = currentPage + maxPagesAfterCurrent;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const showStartEllipsis = startPage > 1;
  const showEndEllipsis = endPage < totalPages;

  return (
    <nav className="pagination-nav" aria-label="Table pagination">
      <ul className="pagination">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link page-link--prev"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &laquo; {/* Left arrow */}
          </button>
        </li>

        {/* First Page & Ellipsis */}
        {showStartEllipsis && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageClick(1)}>
                1
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link ellipsis">...</span>
            </li>
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(number)}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}

        {/* End Ellipsis & Last Page */}
        {showEndEllipsis && (
          <>
            <li className="page-item disabled">
              <span className="page-link ellipsis">...</span>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageClick(totalPages)}>
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link page-link--next"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
             &raquo; {/* Right arrow */}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;