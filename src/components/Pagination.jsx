import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for(let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="page-button">
          Anterior
        </button>
      )}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-button ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="page-button">
          Siguiente
        </button>
      )}
    </div>
  );
};

export default Pagination;
