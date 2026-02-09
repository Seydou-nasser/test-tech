interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasMore: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
}

/**
 * Composant de pagination minimaliste
 */
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  hasMore,
  onNext,
  onPrev,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination">
      <div className="pagination-info">
        {startIdx}-{endIdx} sur {totalItems}
      </div>
      <div className="pagination-controls">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="pagination-btn"
          aria-label="Page précédente"
        >
          &larr;
        </button>
        <span className="pagination-current">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={!hasMore}
          className="pagination-btn"
          aria-label="Page suivante"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
