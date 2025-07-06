"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductsPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

const ProductsPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
}: ProductsPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }
    return `?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    router.push(createPageURL(pageNumber));
  };

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        products
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={
                currentPage > 1 ? createPageURL(currentPage - 1) : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <span className="flex items-center justify-center px-3 py-2">
                  ...
                </span>
              ) : (
                <PaginationLink
                  href={createPageURL(page as number)}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages
                  ? createPageURL(currentPage + 1)
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPagination;
