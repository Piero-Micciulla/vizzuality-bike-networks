"use client";

import { PaginationProps } from "@/types/pagination";
import { cn } from "@/lib/utils";
import { getPaginationStyles } from "@/lib/pagination-variants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = "primary",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const styles = getPaginationStyles(variant);

  const getVisiblePages = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage === 3) return [2, 3, 4];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="pagination-container"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn("pagination-navigation", styles.navigation)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden md:inline">Previous</span>
      </button>

      {currentPage > 2 && (
        <span className="px-2 text-sm text-zinc-500" aria-hidden="true">
          …
        </span>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
          className={cn(
            "pagination-button",
            styles.button,
            currentPage === page && styles.active
          )}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 1 && (
        <span className={cn("pagination-dots", styles.dots)} aria-hidden="true">
          …
        </span>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn("pagination-navigation", styles.navigation)}
        aria-label="Next page"
      >
        <span className="hidden md:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
};
