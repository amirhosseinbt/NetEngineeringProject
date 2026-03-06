"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationBarProps {
  /** Total number of items */
  total: number;
  /** Current 1-based page */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Label for summary e.g. "سرور" or "رزرو" */
  itemLabel: string;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Optional: callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Optional: page size options for dropdown */
  pageSizeOptions?: number[];
  loading?: boolean;
  /** Optional className for the wrapper */
  className?: string;
}

const MAX_VISIBLE_PAGES = 5;

function getPageWindow(totalPages: number, page: number): number[] {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
  if (end - start + 1 < MAX_VISIBLE_PAGES) {
    start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function PaginationBar({
  total,
  page,
  pageSize,
  itemLabel,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  loading = false,
  className = "",
}: PaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);
  const summary =
    total === 0
      ? `هیچ ${itemLabel}ی یافت نشد`
      : `نمایش ${startItem.toLocaleString("fa-IR")} تا ${endItem.toLocaleString("fa-IR")} از ${total.toLocaleString("fa-IR")} ${itemLabel}`;

  const pageNumbers = getPageWindow(totalPages, page);

  return (
    <div
      className={`pagination-bar ${className}`}
      role="region"
      aria-label="صفحه‌بندی"
      dir="rtl"
    >
      <div className="pagination-bar-summary">
        {loading ? "در حال بارگذاری..." : summary}
      </div>

      <div className="pagination-bar-controls">
        {onPageSizeChange && pageSizeOptions.length > 0 && (
          <div className="pagination-bar-size">
            <label htmlFor="pagination-size" className="pagination-bar-size-label">
              نمایش در هر صفحه:
            </label>
            <select
              id="pagination-size"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="pagination-bar-size-select"
              aria-label="تعداد در هر صفحه"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n.toLocaleString("fa-IR")}
                </option>
              ))}
            </select>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="pagination-bar-nav" aria-label="صفحه‌بندی">
            <button
              type="button"
              onClick={() => onPageChange(1)}
              disabled={page <= 1 || loading}
              className="pagination-bar-btn pagination-bar-btn-icon"
              aria-label="صفحه اول"
            >
              <ChevronsRight size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1 || loading}
              className="pagination-bar-btn pagination-bar-btn-icon"
              aria-label="صفحه قبل"
            >
              <ChevronRight size={18} aria-hidden />
            </button>

            <div className="pagination-bar-pages" role="group" aria-label="شماره صفحه">
              {pageNumbers[0] > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onPageChange(1)}
                    className="pagination-bar-btn pagination-bar-btn-num"
                  >
                    ۱
                  </button>
                  {pageNumbers[0] > 2 && <span className="pagination-bar-ellipsis">…</span>}
                </>
              )}
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onPageChange(n)}
                  disabled={loading}
                  className={`pagination-bar-btn pagination-bar-btn-num ${n === page ? "pagination-bar-btn-active" : ""}`}
                  aria-current={n === page ? "page" : undefined}
                  aria-label={`صفحه ${n.toLocaleString("fa-IR")}`}
                >
                  {n.toLocaleString("fa-IR")}
                </button>
              ))}
              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                    <span className="pagination-bar-ellipsis">…</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onPageChange(totalPages)}
                    className="pagination-bar-btn pagination-bar-btn-num"
                  >
                    {totalPages.toLocaleString("fa-IR")}
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages || loading}
              className="pagination-bar-btn pagination-bar-btn-icon"
              aria-label="صفحه بعد"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              disabled={page >= totalPages || loading}
              className="pagination-bar-btn pagination-bar-btn-icon"
              aria-label="صفحه آخر"
            >
              <ChevronsLeft size={18} aria-hidden />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
