"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, Cpu, HardDrive, MemoryStick, Monitor } from "lucide-react";
import ReservationCalendar from "@/components/hardware/ReservationCalendar";
import { hardwareApi } from "@/services/hardwareApi";
import { getBackendErrorMessage } from "@/lib/apiError";
import { toast } from "sonner";
import type { HardwareServer, RentalUnit } from "@/types/hardware";

export default function ReserveClient({ serverId }: { serverId: number | string }) {
  const [server, setServer] = useState<HardwareServer | null>(null);
  const [serverLoading, setServerLoading] = useState(true);
  const [unit, setUnit] = useState<RentalUnit>("HOURLY");
  const [selection, setSelection] = useState<{ startAt: string; endAt: string } | null>(null);
  const [previewAmount, setPreviewAmount] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setServerLoading(true);
      try {
        const data = await hardwareApi.getServer(serverId);
        if (!cancelled) setServer(data ?? null);
      } catch (e) {
        if (!cancelled) {
          toast.error(getBackendErrorMessage(e));
          setServer(null);
        }
      } finally {
        if (!cancelled) setServerLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [serverId]);

  const handleSelectionChange = useCallback((value: { startAt: string; endAt: string } | null) => {
    setSelection(value);
    setPreviewAmount(null);
    setPreviewError(null);
  }, []);

  useEffect(() => {
    if (!selection || !server) return;
    setPreviewLoading(true);
    setPreviewError(null);
    let cancelled = false;
    hardwareApi
      .getReservationPreview({
        serverId,
        unit,
        startAt: selection.startAt,
        endAt: selection.endAt,
      })
      .then((preview) => {
        if (!cancelled) {
          setPreviewAmount(preview.totalAmount);
          setPreviewError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setPreviewAmount(null);
          setPreviewError(getBackendErrorMessage(e));
        }
      })
      .finally(() => {
        if (!cancelled) setPreviewLoading(false);
      });
    return () => { cancelled = true; };
  }, [selection, server, serverId, unit]);

  const checkoutHref = useMemo(() => {
    if (!selection) return "";
    return `/hardware/checkout/${serverId}?unit=${unit}&startAt=${encodeURIComponent(selection.startAt)}&endAt=${encodeURIComponent(selection.endAt)}`;
  }, [selection, serverId, unit]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const canReserve = server?.status === "AVAILABLE";

  return (
    <div className="page-shell" dir="rtl">
      <div className="content-shell reserve-page-content">
        <div className="reserve-page-header">
          <Link href="/hardware" className="reserve-back-btn" aria-label="بازگشت به لیست سرورها">
            <ArrowRight size={20} aria-hidden />
            <span>بازگشت به لیست سرورها</span>
          </Link>
          <h1 className="section-title reserve-page-title">رزرو سرور</h1>
        </div>

        {serverLoading ? (
          <div className="reserve-server-card muted-panel p-5">
            <p className="text-sm font-bold text-slate-600">در حال بارگذاری اطلاعات سرور...</p>
          </div>
        ) : server ? (
          <>
            <div className="reserve-server-card">
              <h2 className="reserve-server-name">{server.name}</h2>
              {server.status !== "AVAILABLE" && (
                <div className="reserve-server-unavailable" role="alert">
                  این سرور در حال حاضر برای رزرو در دسترس نیست
                  {server.status === "MAINTENANCE" && " (در تعمیر)"}
                  {server.status === "DISABLED" && " (غیرفعال)"}.
                </div>
              )}
              <dl className="reserve-server-specs">
                <div className="reserve-spec">
                  <dt><Cpu size={16} aria-hidden /> پردازنده</dt>
                  <dd>{server.cpu}</dd>
                </div>
                <div className="reserve-spec">
                  <dt><Monitor size={16} aria-hidden /> کارت گرافیک</dt>
                  <dd>{server.gpu}</dd>
                </div>
                <div className="reserve-spec">
                  <dt><MemoryStick size={16} aria-hidden /> رم</dt>
                  <dd>{server.ramGb} گیگابایت</dd>
                </div>
                <div className="reserve-spec">
                  <dt><HardDrive size={16} aria-hidden /> دیسک</dt>
                  <dd>{server.diskGb} گیگابایت</dd>
                </div>
              </dl>
              <div className="reserve-server-prices">
                <span className="reserve-price">ساعتی: {server.hourlyPrice.toLocaleString("fa-IR")} تومان</span>
                <span className="reserve-price">روزانه: {server.dailyPrice.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
            {!canReserve && (
              <div className="reserve-unavailable-notice muted-panel p-5 mt-4">
                <p className="text-sm font-bold text-slate-600">رزرو این سرور امکان‌پذیر نیست. لطفاً از لیست سرورها یک سرور «در دسترس» انتخاب کنید.</p>
              </div>
            )}
          </>
        ) : null}

        {canReserve && (
        <>
        <div className="reserve-unit-section">
          <p className="reserve-section-label">نوع رزرو</p>
          <div className="reserve-unit-segment" role="group" aria-label="نوع رزرو">
            <button
              type="button"
              onClick={() => setUnit("HOURLY")}
              className={`reserve-unit-btn ${unit === "HOURLY" ? "reserve-unit-btn-active" : ""}`}
              aria-pressed={unit === "HOURLY"}
            >
              رزرو ساعتی
            </button>
            <button
              type="button"
              onClick={() => setUnit("DAILY")}
              className={`reserve-unit-btn ${unit === "DAILY" ? "reserve-unit-btn-active" : ""}`}
              aria-pressed={unit === "DAILY"}
            >
              رزرو روزانه
            </button>
          </div>
        </div>

        <div className="reserve-calendar-section">
          <p className="reserve-section-label">
            <Calendar size={18} aria-hidden />
            انتخاب بازه زمانی
          </p>
          <p className="reserve-section-hint">روز و بازه مورد نظر را از تقویم و اسلات‌های زمانی انتخاب کنید.</p>
          <ReservationCalendar
            serverId={serverId}
            unit={unit}
            onSelectionChange={handleSelectionChange}
          />
        </div>

        <div className="reserve-summary-section">
          {selection ? (
            <div className="reserve-summary-card">
              <p className="reserve-summary-title">خلاصه انتخاب</p>
              <div className="reserve-summary-row">
                <span className="reserve-summary-label">شروع</span>
                <span className="reserve-summary-value">{formatDate(selection.startAt)}</span>
              </div>
              <div className="reserve-summary-row">
                <span className="reserve-summary-label">پایان</span>
                <span className="reserve-summary-value">{formatDate(selection.endAt)}</span>
              </div>
              {previewLoading ? (
                <p className="reserve-summary-cost reserve-summary-cost-loading">در حال محاسبه مبلغ...</p>
              ) : previewAmount != null ? (
                <p className="reserve-summary-cost">مبلغ تقریبی: {previewAmount.toLocaleString("fa-IR")} تومان</p>
              ) : null}
              {previewError ? (
                <div className="reserve-summary-error" role="alert">
                  <p className="reserve-summary-error-text">{previewError}</p>
                  <p className="reserve-summary-error-hint">بازه دیگری انتخاب کنید یا روز/ساعت شروع و پایان را طوری تنظیم کنید که با رزروهای موجود همپوشانی نداشته باشد.</p>
                </div>
              ) : null}
              <Link
                href={previewError ? "#" : checkoutHref}
                className={`reserve-checkout-btn ${previewError ? "reserve-checkout-btn-disabled" : ""}`}
                aria-disabled={!!previewError}
                onClick={(e) => previewError && e.preventDefault()}
              >
                ادامه به تسویه و ثبت رزرو
              </Link>
            </div>
          ) : (
            <div className="reserve-summary-empty muted-panel p-5">
              <p className="text-sm font-bold text-slate-600">برای ادامه، یک بازه زمانی از تقویم انتخاب کنید.</p>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
