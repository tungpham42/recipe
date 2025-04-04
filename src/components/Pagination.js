import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";

const Pagination = ({
  itemsPerPage = 6,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const { t } = useLanguage();
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageCount) {
      onPageChange(pageNumber);
    }
  };

  if (pageCount <= 1) return null;

  const renderPageItems = () => {
    const items = [];

    // Always show first page
    items.push(
      <BootstrapPagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => handlePageChange(1)}
        className="pagination-item"
      >
        1
      </BootstrapPagination.Item>
    );

    // Calculate middle pages to show
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(pageCount - 1, currentPage + 1);

    // Adjust if we have fewer than 4 pages total
    if (pageCount <= 4) {
      startPage = 2;
      endPage = pageCount - 1;
    }

    // Add ellipsis before middle pages if needed
    if (startPage > 2) {
      items.push(<BootstrapPagination.Ellipsis key="start-ellipsis" />);
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          className="pagination-item"
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    // Add ellipsis after middle pages if needed
    if (endPage < pageCount - 1) {
      items.push(<BootstrapPagination.Ellipsis key="end-ellipsis" />);
    }

    // Always show last page if more than 1 page
    if (pageCount > 1) {
      items.push(
        <BootstrapPagination.Item
          key={pageCount}
          active={pageCount === currentPage}
          onClick={() => handlePageChange(pageCount)}
          className="pagination-item"
        >
          {pageCount}
        </BootstrapPagination.Item>
      );
    }

    return items;
  };

  return (
    <BootstrapPagination className="justify-content-center mt-4 custom-pagination">
      <BootstrapPagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-nav"
      >
        <span>{t("Previous")}</span>
      </BootstrapPagination.Prev>

      {renderPageItems()}

      <BootstrapPagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="pagination-nav"
      >
        <span>{t("Next")}</span>
      </BootstrapPagination.Next>
    </BootstrapPagination>
  );
};

export default Pagination;
