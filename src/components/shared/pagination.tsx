import { ChevronLeft, ChevronRight } from "lucide-react";
import { PerPageSelector } from "./per-page-selector";
import { Tooltip } from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rangeText?: string;
  className?: string;
  perPage?: number;
  onPerPageChange?: (perPage: number) => void;
  perPageOptions?: number[];
  perPageDirection?: "up" | "down";
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rangeText,
  className,
  perPage,
  onPerPageChange,
  perPageOptions,
  perPageDirection = "up",
}: PaginationProps) {
  // Generate pages array
  const pages: Array<number | "..."> = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, Math.min(currentPage - 1, totalPages - 3));
    const end = Math.min(totalPages - 1, Math.max(currentPage + 1, 3));
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const defaultRangeText = `Halaman ${currentPage} dari ${totalPages}`;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 py-3",
        className,
      )}
    >
      <div className="font-sans text-sm text-neutral-500">
        {rangeText || defaultRangeText}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {perPage !== undefined && onPerPageChange && (
          <PerPageSelector
            perPage={perPage}
            onPerPageChange={onPerPageChange}
            options={perPageOptions}
            direction={perPageDirection}
          />
        )}

        <div className="flex items-center gap-1">
          <Tooltip content="Halaman Sebelumnya">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="size-9 rounded-md border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="size-4" />
            </button>
          </Tooltip>

          <div className="hidden sm:flex items-center gap-1">
            {pages.map((p, idx) => {
              if (p === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="size-9 flex items-center justify-center text-neutral-400 font-bold"
                  >
                    …
                  </span>
                );
              }

              const isActive = p === currentPage;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={cn(
                    "size-9 rounded-md font-label text-sm font-semibold transition-colors flex items-center justify-center",
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Mobile page indicator */}
          <span className="sm:hidden font-label text-xs font-semibold px-2 text-neutral-700">
            Hal {currentPage} / {totalPages}
          </span>

          <Tooltip content="Halaman Selanjutnya">
            <button
              type="button"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage >= totalPages}
              className="size-9 rounded-md border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Halaman Selanjutnya"
            >
              <ChevronRight className="size-4" />
            </button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}

export { PerPageSelector } from "./per-page-selector";
export type { PerPageSelectorProps } from "./per-page-selector";
