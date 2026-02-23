"use client";

import { useEffect, useState } from "react";
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
  const [paid, setPaid] = useState(false);

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
    await hardwareApi.checkoutReservation({ previewId: String(serverId) });
    setPaid(true);
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

            <button onClick={handleConfirm} className="primary-btn mt-3">
              تایید پرداخت (آزمایشی)
            </button>

            {paid && (
              <p className="rounded-md bg-green-100 p-3 text-green-700">
                پرداخت ثبت شد و رزرو با موفقیت ایجاد شد.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
