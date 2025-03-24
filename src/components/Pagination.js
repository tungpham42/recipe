import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext"; // Adjust path as needed

const Pagination = ({
  itemsPerPage = 6,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const { t } = useLanguage(); // Access the translate function from LanguageContext
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageCount) {
      onPageChange(pageNumber);
    }
  };

  if (pageCount <= 1) return null;

  return (
    <BootstrapPagination className="justify-content-center mt-4 custom-pagination">
      <BootstrapPagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-nav"
      >
        <span>{t("Previous")}</span> {/* Translate "Previous" */}
      </BootstrapPagination.Prev>

      {Array.from({ length: pageCount }, (_, index) => (
        <BootstrapPagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
          className="pagination-item"
        >
          {index + 1}
        </BootstrapPagination.Item>
      ))}

      <BootstrapPagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="pagination-nav"
      >
        <span>{t("Next")}</span> {/* Translate "Next" */}
      </BootstrapPagination.Next>
    </BootstrapPagination>
  );
};

export default Pagination;
