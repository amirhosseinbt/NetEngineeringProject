"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Cpu, HardDrive, MemoryStick, Monitor, Search } from "lucide-react";
import PaginationBar from "@/components/ui/PaginationBar";
import { hardwareApi } from "@/services/hardwareApi";
import { getBackendErrorMessage } from "@/lib/apiError";
import type { BuildBasis, HardwareServer } from "@/types/hardware";

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const SEARCH_DEBOUNCE_MS = 350;

const statusLabel: Record<string, string> = {
  AVAILABLE: "در دسترس",
  MAINTENANCE: "در تعمیر",
  DISABLED: "غیرفعال",
};

type StatusFilter = "AVAILABLE" | "MAINTENANCE" | "DISABLED" | "";
const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "AVAILABLE", label: "در دسترس" },
  { value: "MAINTENANCE", label: "در تعمیر" },
  { value: "DISABLED", label: "غیرفعال" },
];

export default function HardwareListClient() {
  const [result, setResult] = useState<{ items: HardwareServer[]; total: number; page: number; pageSize: number }>({
    items: [],
    total: 0,
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [loading, setLoading] = useState(true);
  const [basis, setBasis] = useState<BuildBasis>("GPU");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchServers = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      try {
        const data = await hardwareApi.getServers({
          page,
          page_size: pageSize,
          q: debouncedSearch.trim() || undefined,
          cpu: basis === "CPU" && debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
          gpu: basis === "GPU" && debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
          status: statusFilter || undefined,
        });
        setResult({
          items: data.items,
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
        });
      } catch (e) {
        toast.error(getBackendErrorMessage(e));
      } finally {
        setLoading(false);
      }
    },
    [basis, debouncedSearch, statusFilter]
  );

  useEffect(() => {
    fetchServers(1, result.pageSize);
  }, [basis, debouncedSearch, statusFilter, fetchServers]);

  const goToPage = (page: number) => {
    if (page < 1 || page > Math.ceil(result.total / result.pageSize)) return;
    fetchServers(page, result.pageSize);
  };

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setResult((prev) => ({ ...prev, pageSize: size, page: 1 }));
      fetchServers(1, size);
    },
    [fetchServers]
  );

  const startItem = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;

  return (
    <div className="page-shell">
      <div className="content-shell">
        <h1 className="section-title">رزرو سخت‌افزار</h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          جستجو کنید یا وضعیت را فیلتر کنید و سرور مورد نظر را برای رزرو انتخاب کنید.
        </p>

        <div className="hw-toolbar" dir="rtl">
          <div className="hw-toolbar-row">
            <div className="hw-toolbar-group hw-search-group">
              <span className="hw-toolbar-label">جستجو بر اساس</span>
              <div className="hw-search-by-row">
                <div className="hw-filter-segment" role="group" aria-label="جستجو بر اساس کارت گرافیک یا پردازنده">
                  <button
                    type="button"
                    onClick={() => setBasis("GPU")}
                    className={`hw-filter-segment-btn ${basis === "GPU" ? "hw-filter-segment-btn-active" : ""}`}
                    aria-pressed={basis === "GPU"}
                  >
                    <Monitor size={18} aria-hidden />
                    کارت گرافیک
                  </button>
                  <button
                    type="button"
                    onClick={() => setBasis("CPU")}
                    className={`hw-filter-segment-btn ${basis === "CPU" ? "hw-filter-segment-btn-active" : ""}`}
                    aria-pressed={basis === "CPU"}
                  >
                    <Cpu size={18} aria-hidden />
                    پردازنده
                  </button>
                </div>
                <div className="hw-search-wrap">
                  <Search size={18} className="hw-search-icon" aria-hidden />
                  <input
                    id="hw-search"
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={basis === "GPU" ? "مثال: RTX 5080" : "مثال: Ryzen 9"}
                    className="hw-search-input"
                    aria-label="عبارت جستجو"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
            <div className="hw-toolbar-group">
              <label htmlFor="hw-status" className="hw-toolbar-label">
                وضعیت سرور
              </label>
              <select
                id="hw-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="hw-status-select"
                aria-label="فیلتر وضعیت سرور"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ul className="hw-server-list" aria-label="لیست سرورها">
          {result.items.map((server, index) => (
            <li key={String(server.id)} className="hw-server-card" dir="rtl">
              <span className="hw-server-index" aria-hidden>
                {startItem + index}
              </span>
              <div className="hw-server-body">
                <div className="hw-server-content">
                  <div className="hw-server-main">
                    <h2 className="hw-server-name">{server.name}</h2>
                    <span className={`hw-server-status hw-server-status-${String(server.status).toLowerCase()}`}>
                      {statusLabel[server.status] ?? server.status}
                    </span>
                  </div>
                  <dl className="hw-server-specs">
                    <div className="hw-spec-row">
                      <dt className="hw-spec-dt">
                        <Cpu size={16} aria-hidden />
                        پردازنده
                      </dt>
                      <dd className="hw-spec-dd">{server.cpu}</dd>
                    </div>
                    <div className="hw-spec-row">
                      <dt className="hw-spec-dt">
                        <Monitor size={16} aria-hidden />
                        کارت گرافیک
                      </dt>
                      <dd className="hw-spec-dd">{server.gpu}</dd>
                    </div>
                    <div className="hw-spec-row">
                      <dt className="hw-spec-dt">
                        <MemoryStick size={16} aria-hidden />
                        حافظه رم
                      </dt>
                      <dd className="hw-spec-dd">{server.ramGb} گیگابایت</dd>
                    </div>
                    <div className="hw-spec-row">
                      <dt className="hw-spec-dt">
                        <HardDrive size={16} aria-hidden />
                        فضای ذخیره
                      </dt>
                      <dd className="hw-spec-dd">{server.diskGb} گیگابایت</dd>
                    </div>
                    <div className="hw-spec-row">
                      <dt className="hw-spec-dt">سیستم‌عامل</dt>
                      <dd className="hw-spec-dd">{server.os}</dd>
                    </div>
                  </dl>
                </div>
                <div className="hw-server-pricing">
                  <div className="hw-price-block">
                    <span className="hw-price-label">ساعتی</span>
                    <span className="hw-price-value">{server.hourlyPrice.toLocaleString("fa-IR")}</span>
                    <span className="hw-price-unit">تومان</span>
                  </div>
                  <div className="hw-price-block">
                    <span className="hw-price-label">روزانه</span>
                    <span className="hw-price-value">{server.dailyPrice.toLocaleString("fa-IR")}</span>
                    <span className="hw-price-unit">تومان</span>
                  </div>
                  {server.status === "AVAILABLE" ? (
                    <Link href={`/hardware/reserve/${server.id}`} className="hw-reserve-btn">
                      رزرو این سرور
                    </Link>
                  ) : (
                    <span
                      className="hw-reserve-btn hw-reserve-btn-disabled"
                      title={statusLabel[server.status] ?? server.status}
                      aria-disabled
                    >
                      غیرقابل رزرو ({statusLabel[server.status] ?? server.status})
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {!loading && result.items.length === 0 && (
          <p className="hw-empty">سروری یافت نشد.</p>
        )}

        <PaginationBar
          total={result.total}
          page={result.page}
          pageSize={result.pageSize}
          itemLabel="سرور"
          onPageChange={goToPage}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          loading={loading}
        />
      </div>
    </div>
  );
}
