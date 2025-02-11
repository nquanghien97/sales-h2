import React from 'react';
import { usePagination, DOTS } from '@/hooks/usePagination';

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex justify-center w-full list-none">
      <li
        className={`px-3 h-[32px] text-center m-auto mx-1 text-[#ccc] flex items-center rounded-2xl min-w-[32px] cursor-pointer hover:opacity-70 ${currentPage === 1 ? 'pointer-events-none hover:bg-transparent cursor-default' : ''
          }`}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={`px-3 h-[32px] text-center m-auto mx-1 text-black flex items-center rounded-2xl min-w-[32px] cursor-pointer hover:opacity-70 hover:bg-transparent hover:cursor-default`}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`px-3 h-[32px] text-center m-auto mx-1 text-black flex items-center rounded-2xl min-w-[32px] cursor-pointer hover:opacity-70 ${pageNumber === currentPage ? 'bg-[#ccc]' : ''
              }`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`px-3 h-[32px] text-center m-auto mx-1 text-black flex items-center rounded-2xl min-w-[32px] cursor-pointer hover:opacity-70 ${currentPage === lastPage ? 'pointer-events-none text-black opacity-80 hover:bg-transparent cursor-default' : ''
          }`}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
