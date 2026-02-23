"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import ReservationCalendar from "@/components/hardware/ReservationCalendar";
import type { RentalUnit } from "@/types/hardware";

export default function ReserveClient({ serverId }: { serverId: number }) {
  const [unit, setUnit] = useState<RentalUnit>("HOURLY");
  const [selection, setSelection] = useState<{ startAt: string; endAt: string } | null>(null);
  const handleSelectionChange = useCallback(
    (value: { startAt: string; endAt: string } | null) => {
      setSelection(value);
    },
    []
  );

  const checkoutHref = useMemo(() => {
    if (!selection) return "";
    return `/hardware/checkout/${serverId}?unit=${unit}&startAt=${encodeURIComponent(selection.startAt)}&endAt=${encodeURIComponent(selection.endAt)}`;
  }, [selection, serverId, unit]);

  return (
    <div className="page-shell">
      <div className="content-shell">
        <h1 className="section-title">رزرو سرور #{serverId}</h1>
        <p className="mt-2 text-sm text-slate-600">
          تقویم حرفه ای رزرو: روزهای آزاد/رزرو شده نمایش داده می شود و می توانید بازه دقیق خود را انتخاب کنید.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setUnit("HOURLY")}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              unit === "HOURLY"
                ? "bg-gradient-to-l from-[#1d3ca1] to-[#244BC5] text-white shadow-[0_10px_20px_rgba(36,75,197,0.26)]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            رزرو ساعتی
          </button>
          <button
            onClick={() => setUnit("DAILY")}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              unit === "DAILY"
                ? "bg-gradient-to-l from-[#1d3ca1] to-[#244BC5] text-white shadow-[0_10px_20px_rgba(36,75,197,0.26)]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            رزرو روزانه
          </button>
        </div>

        <ReservationCalendar
          serverId={serverId}
          unit={unit}
          onSelectionChange={handleSelectionChange}
        />

        <div className="mt-5 muted-panel text-sm font-bold text-slate-700">
          {selection ? (
            <>
              <p>بازه انتخابی نهایی:</p>
              <p>شروع: {new Date(selection.startAt).toLocaleString("fa-IR")}</p>
              <p>پایان: {new Date(selection.endAt).toLocaleString("fa-IR")}</p>
              <Link href={checkoutHref} className="primary-btn mt-3">
                ادامه به تسویه
              </Link>
            </>
          ) : (
            <p>هنوز بازه رزرو انتخاب نشده است.</p>
          )}
        </div>
      </div>
    </div>
  );
}
