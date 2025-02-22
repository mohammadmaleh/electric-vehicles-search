import { carPageLimit } from '@/app/static/car.consts';
import type PaginationProps from './Pagination.props';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  disabled = false,
}) => {
  const renderTotalPages = (): React.ReactElement[] => {
    return Array.from({ length: totalPages }, (currentElement, index) => {
      const pageNumber = index + 1;

      const isCurrent = currentPage === pageNumber;

      return (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isCurrent
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={disabled}
          aria-label={`Go to page ${pageNumber}`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="flex  items-center justify-between ">
      <div className="flex gap-2">{renderTotalPages()}</div>

      {totalItems !== null && (
        <span
          className="text-xs md:text-sm text-gray-500 whitespace-nowrap"
          data-testid="pagination-text"
        >
          Showing {carPageLimit} of {totalItems}
        </span>
      )}
    </div>
  );
};

export default Pagination;
