"use client";

import { useMemo, useEffect, useState } from "react";
import { Copy, Eye, EyeOff, KeyRound, Monitor, User } from "lucide-react";
import { toast } from "sonner";
import { hardwareApi } from "@/services/hardwareApi";
import PaginationBar from "@/components/ui/PaginationBar";
import type { PurchasedService } from "@/types/hardware";

const DEFAULT_PAGE_SIZE = 5;
const PAGE_SIZE_OPTIONS = [5, 10, 20];

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Display label for reservation (ordinal only; no UUID). */
function formatReservationLabel(ordinal: number): string {
  return `رزرو ${ordinal.toLocaleString("fa-IR")}`;
}

/** Human-readable duration between start and end. */
function formatDuration(startAt: string, endAt: string): string {
  const start = new Date(startAt);
  const end = new Date(endAt);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "—";
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return "—";
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainderHours = hours % 24;
  if (days > 0 && remainderHours > 0) {
    return `${days.toLocaleString("fa-IR")} روز و ${remainderHours.toLocaleString("fa-IR")} ساعت`;
  }
  if (days > 0) return `${days.toLocaleString("fa-IR")} روز`;
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes > 0) {
    return `${hours.toLocaleString("fa-IR")} ساعت و ${minutes.toLocaleString("fa-IR")} دقیقه`;
  }
  return `${hours.toLocaleString("fa-IR")} ساعت`;
}

function hasCredentials(item: PurchasedService): boolean {
  return !!(item.ipAddress?.trim() || item.username?.trim() || item.password?.trim());
}

export default function UserDashboardReservations() {
  const [items, setItems] = useState<PurchasedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await hardwareApi.getMyServices();
        setItems(data ?? []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const total = items.length;
  const startIndex = (page - 1) * pageSize;
  const pageItems = useMemo(
    () => items.slice(startIndex, startIndex + pageSize),
    [items, startIndex, pageSize]
  );

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const toggleShowPassword = (key: string) => {
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (label: string, value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(
      () => toast.success(`${label} کپی شد.`),
      () => toast.error("کپی انجام نشد.")
    );
  };

  return (
    <div dir="rtl">
      <h1 className="admin-section-title">سیستم‌های رزرو شده من</h1>
      <p className="admin-subtitle">در این بخش رزروهای ثبت‌شده شما و در صورت ثبت، اطلاعات دسترسی (آی‌پی، نام کاربری، رمز) نمایش داده می‌شود.</p>

      {loading ? (
        <div className="muted-panel mt-5 text-sm font-bold text-slate-700">در حال بارگذاری رزروها...</div>
      ) : items.length === 0 ? (
        <div className="muted-panel mt-5 text-sm font-bold text-slate-700">هنوز رزروی ثبت نشده است.</div>
      ) : (
        <>
          <ul className="dashboard-reservation-list mt-5" aria-label="لیست رزروها">
            {pageItems.map((item, index) => {
              const key = String(item.reservationId);
              const hasCreds = hasCredentials(item);
              const showPw = showPasswords[key];
              const ordinal = startIndex + index + 1;
              const duration = formatDuration(item.startAt, item.endAt);
              return (
                <li key={key} className="dashboard-reservation-card">
                  <div className="dashboard-reservation-header">
                    <span className="dashboard-reservation-id">{formatReservationLabel(ordinal)}</span>
                    <span className="dashboard-reservation-server">{item.serverName}</span>
                    {hasCreds ? (
                      <span className="dashboard-reservation-status dashboard-reservation-status-done">اطلاعات دسترسی ثبت شده</span>
                    ) : (
                      <span className="dashboard-reservation-status dashboard-reservation-status-pending">در انتظار ثبت</span>
                    )}
                  </div>
                  <div className="dashboard-reservation-meta">
                    <span className="dashboard-reservation-dates">
                      {formatDate(item.startAt)} تا {formatDate(item.endAt)}
                    </span>
                    <span className="dashboard-reservation-duration" title="مدت رزرو">
                      {duration}
                    </span>
                    <span className="dashboard-reservation-cost">{item.totalAmount.toLocaleString("fa-IR")} تومان</span>
                  </div>
                  {hasCreds ? (
                    <div className="dashboard-reservation-credentials">
                      <p className="dashboard-reservation-credentials-title">اطلاعات دسترسی</p>
                      <dl className="dashboard-reservation-credentials-list">
                        {item.ipAddress?.trim() && (
                          <div className="dashboard-reservation-cred-row">
                            <dt>
                              <Monitor size={14} aria-hidden />
                              آدرس IP
                            </dt>
                            <dd>
                              <code>{item.ipAddress}</code>
                              <button
                                type="button"
                                onClick={() => copyToClipboard("آدرس IP", item.ipAddress!)}
                                className="dashboard-reservation-copy"
                                aria-label="کپی آدرس IP"
                              >
                                <Copy size={14} />
                              </button>
                            </dd>
                          </div>
                        )}
                        {item.username?.trim() && (
                          <div className="dashboard-reservation-cred-row">
                            <dt>
                              <User size={14} aria-hidden />
                              نام کاربری
                            </dt>
                            <dd>
                              <code>{item.username}</code>
                              <button
                                type="button"
                                onClick={() => copyToClipboard("نام کاربری", item.username!)}
                                className="dashboard-reservation-copy"
                                aria-label="کپی نام کاربری"
                              >
                                <Copy size={14} />
                              </button>
                            </dd>
                          </div>
                        )}
                        {item.password?.trim() && (
                          <div className="dashboard-reservation-cred-row">
                            <dt>
                              <KeyRound size={14} aria-hidden />
                              رمز عبور
                            </dt>
                            <dd>
                              <code>{showPw ? item.password : "••••••••"}</code>
                              <button
                                type="button"
                                onClick={() => toggleShowPassword(key)}
                                className="dashboard-reservation-copy"
                                aria-label={showPw ? "مخفی کردن رمز" : "نمایش رمز"}
                              >
                                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                              <button
                                type="button"
                                onClick={() => copyToClipboard("رمز عبور", item.password!)}
                                className="dashboard-reservation-copy"
                                aria-label="کپی رمز عبور"
                              >
                                <Copy size={14} />
                              </button>
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  ) : (
                    <div className="dashboard-reservation-credentials-pending" role="status">
                      <p className="dashboard-reservation-credentials-pending-text">
                        اطلاعات دسترسی (آی‌پی، نام کاربری و رمز) هنوز توسط پشتیبانی برای این رزرو ثبت نشده است. پس از ثبت، در اینجا نمایش داده می‌شود.
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <PaginationBar
            total={total}
            page={page}
            pageSize={pageSize}
            itemLabel="رزرو"
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}
