"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { hardwareApi } from "@/services/hardwareApi";
import type { RentalUnit, ReservationPreview } from "@/types/hardware";

interface CheckoutClientProps {
  serverId: number;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
}

export default function CheckoutClient({ serverId, unit, startAt, endAt }: CheckoutClientProps) {
  const [preview, setPreview] = useState<ReservationPreview | null>(null);
  const [paidReservationId, setPaidReservationId] = useState<number | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const run = async () => {
      const data = await hardwareApi.getReservationPreview({
        serverId,
        unit,
        startAt,
        endAt,
      });
      setPreview(data);
    };

    run();
  }, [serverId, unit, startAt, endAt]);

  const handleConfirm = async () => {
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
      toast.success("رزرو با موفقیت ثبت شد.");
    } catch (error) {
      console.log(error);
      toast.error("ثبت رزرو انجام نشد. دوباره تلاش کنید.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-shell max-w-4xl">
        <h1 className="section-title">تسویه رزرو</h1>
        {!preview && <p className="mt-4 text-sm font-bold text-slate-600">در حال محاسبه هزینه...</p>}

        {preview && (
          <div className="mt-4 muted-panel space-y-2 text-sm font-bold text-slate-700">
            <p>شناسه سرور: {preview.serverId}</p>
            <p>نوع رزرو: {preview.unit === "HOURLY" ? "ساعتی" : "روزانه"}</p>
            <p>شروع: {preview.startAt}</p>
            <p>پایان: {preview.endAt}</p>
            <p className="text-base">مبلغ کل: {preview.totalAmount.toLocaleString()} تومان</p>

            <button onClick={handleConfirm} disabled={paying} className="primary-btn mt-3 disabled:opacity-60">
              {paying ? "در حال ثبت رزرو..." : "تایید پرداخت (آزمایشی)"}
            </button>

            {paidReservationId && (
              <p className="rounded-md bg-green-100 p-3 text-green-700">
                پرداخت ثبت شد و رزرو با شماره #{paidReservationId} با موفقیت ایجاد شد.
              </p>
            )}
            {paidReservationId && (
              <Link href="/" className="secondary-btn mt-2 inline-flex">
                مشاهده در داشبورد کاربر
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
