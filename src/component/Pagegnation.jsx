import React from "react";
import './Pagegnation.css';
const Pagegnation = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPostsPerPageChange,
}) => {
  return (
    <div className="pagination-container">
      <select
        className="page-select"
        onChange={(e) => onPostsPerPageChange(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Per Page
        </option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>

      </select>
      <button
        className="page-btn"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="page-info">
        {currentPage} / {totalPages}
      </span>

      <button
        className="page-btn"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      
    </div>
  );
};

export default Pagegnation;
