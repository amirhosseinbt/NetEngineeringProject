"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, CreditCard, Loader2, Shield } from "lucide-react";
import { hardwareApi } from "@/services/hardwareApi";
import { getBackendErrorMessage } from "@/lib/apiError";
import type { RentalUnit, ReservationPreview } from "@/types/hardware";

type CheckoutStep = "summary" | "payment" | "done";

interface CheckoutClientProps {
  serverId: number | string;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CheckoutClient({ serverId, unit, startAt, endAt }: CheckoutClientProps) {
  const [preview, setPreview] = useState<ReservationPreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [step, setStep] = useState<CheckoutStep>("summary");
  const [paidReservationId, setPaidReservationId] = useState<number | string | null>(null);
  const [paying, setPaying] = useState(false);
  const [fakeCardNumber, setFakeCardNumber] = useState("");

  useEffect(() => {
    setPreviewError(null);
    if (!startAt?.trim() || !endAt?.trim()) {
      setPreview(null);
      setPreviewError("بازه زمانی انتخاب نشده است. از صفحه رزرو یک بازه انتخاب کنید.");
      return;
    }
    const run = async () => {
      try {
        const data = await hardwareApi.getReservationPreview({
          serverId,
          unit,
          startAt: startAt.trim(),
          endAt: endAt.trim(),
        });
        setPreview(data);
      } catch (e) {
        setPreview(null);
        setPreviewError(getBackendErrorMessage(e));
      }
    };
    run();
  }, [serverId, unit, startAt, endAt]);

  const handleGoToPayment = () => setStep("payment");

  const handleConfirmPayment = async () => {
    if (!preview) return;
    setPaying(true);
    try {
      const result = await hardwareApi.checkoutReservation({
        previewId: preview.previewId,
        serverId: preview.serverId,
        unit: preview.unit,
        startAt: preview.startAt,
        endAt: preview.endAt,
        totalAmount: preview.totalAmount,
      });
      setPaidReservationId(result.reservationId);
      setStep("done");
      toast.success("پرداخت و رزرو با موفقیت ثبت شد.");
    } catch (error) {
      toast.error(getBackendErrorMessage(error));
    } finally {
      setPaying(false);
    }
  };

  const reserveHref = `/hardware/reserve/${serverId}`;
  const unitLabel = unit === "HOURLY" ? "ساعتی" : "روزانه";

  return (
    <div className="page-shell" dir="rtl">
      <div className="content-shell max-w-2xl">
        <div className="checkout-page-header">
          <Link href={reserveHref} className="checkout-back-btn" aria-label="بازگشت به انتخاب زمان">
            <ArrowRight size={20} aria-hidden />
            <span>بازگشت به انتخاب زمان</span>
          </Link>
          <h1 className="section-title checkout-page-title">تسویه و ثبت رزرو</h1>
        </div>

        {!preview && !previewError && (
          <div className="checkout-loading muted-panel p-8 flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-[#244BC5]" aria-hidden />
            <p className="text-sm font-bold text-slate-600">در حال محاسبه هزینه...</p>
          </div>
        )}

        {previewError && (
          <div className="checkout-error muted-panel p-5 border border-amber-200 bg-amber-50/80">
            <p className="text-sm font-bold text-amber-800 m-0">{previewError}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link href={reserveHref} className="secondary-btn inline-flex">
                بازگشت به انتخاب زمان
              </Link>
              <Link href="/hardware" className="secondary-btn inline-flex">
                بازگشت به لیست سرورها
              </Link>
            </div>
          </div>
        )}

        {preview && step === "summary" && (
          <div className="checkout-summary-card">
            <p className="checkout-summary-title">خلاصه رزرو</p>
            <div className="checkout-summary-grid">
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">نوع رزرو</span>
                <span className="checkout-summary-value">{unitLabel}</span>
              </div>
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">شروع</span>
                <span className="checkout-summary-value">{formatDate(preview.startAt)}</span>
              </div>
              <div className="checkout-summary-row">
                <span className="checkout-summary-label">پایان</span>
                <span className="checkout-summary-value">{formatDate(preview.endAt)}</span>
              </div>
            </div>
            <div className="checkout-summary-total">
              <span className="checkout-summary-total-label">مبلغ قابل پرداخت</span>
              <span className="checkout-summary-total-value">
                {preview.totalAmount.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <button type="button" onClick={handleGoToPayment} className="checkout-confirm-btn">
              ادامه به درگاه پرداخت
            </button>
          </div>
        )}

        {preview && step === "payment" && !paidReservationId && (
          <div className="checkout-payment-card">
            <p className="checkout-payment-title">
              <CreditCard size={22} aria-hidden />
              درگاه پرداخت (تست)
            </p>
            <p className="checkout-payment-hint">
              این یک درگاه پرداخت آزمایشی است. هیچ مبلغی کسر نمی‌شود. با کلیک روی «پرداخت و ثبت رزرو» فقط رزرو شما ثبت می‌شود.
            </p>
            <div className="checkout-payment-summary">
              <span className="checkout-payment-summary-label">مبلغ</span>
              <span className="checkout-payment-summary-value">
                {preview.totalAmount.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div className="checkout-payment-field">
              <label htmlFor="checkout-fake-card" className="checkout-payment-field-label">
                شماره کارت (اختیاری - تست)
              </label>
              <input
                id="checkout-fake-card"
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="۱۲۳۴-۵۶۷۸-۹۰۱۲-۳۴۵۶"
                value={fakeCardNumber}
                onChange={(e) => setFakeCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                className="checkout-payment-input"
                dir="ltr"
                aria-describedby="checkout-fake-card-hint"
              />
              <span id="checkout-fake-card-hint" className="checkout-payment-field-hint">
                در حالت تست نیازی به وارد کردن شماره کارت واقعی نیست.
              </span>
            </div>
            <div className="checkout-payment-actions">
              <button
                type="button"
                onClick={() => setStep("summary")}
                className="checkout-payment-back-btn"
              >
                بازگشت به خلاصه
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={paying}
                className="checkout-confirm-btn"
              >
                {paying ? (
                  <>
                    <Loader2 size={20} className="animate-spin" aria-hidden />
                    در حال ثبت رزرو...
                  </>
                ) : (
                  <>
                    <Shield size={20} aria-hidden />
                    پرداخت و ثبت رزرو
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === "done" && paidReservationId && (
          <div className="checkout-success-card">
            <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-3" aria-hidden />
            <h2 className="checkout-success-title">رزرو با موفقیت ثبت شد</h2>
            <p className="checkout-success-text">
              پس از ثبت اطلاعات دسترسی توسط پشتیبانی، می‌توانید از بخش «سیستم‌های رزرو شده من» در داشبورد استفاده کنید.
            </p>
            <Link href="/" className="checkout-success-btn">
              مشاهده در داشبورد
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
