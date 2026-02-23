"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ReservationCalendar from "@/components/hardware/ReservationCalendar";
import type { RentalUnit } from "@/types/hardware";

export default function ReserveClient({ serverId }: { serverId: number }) {
  const [unit, setUnit] = useState<RentalUnit>("HOURLY");
  const [selection, setSelection] = useState<{ startAt: string; endAt: string } | null>(null);

  const checkoutHref = useMemo(() => {
    if (!selection) return "";
    return `/hardware/checkout/${serverId}?unit=${unit}&startAt=${encodeURIComponent(selection.startAt)}&endAt=${encodeURIComponent(selection.endAt)}`;
  }, [selection, serverId, unit]);

  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#244BC5]">رزرو سرور #{serverId}</h1>
        <p className="mt-2 text-sm text-slate-600">
          تقویم حرفه ای رزرو: روزهای آزاد/رزرو شده نمایش داده می شود و می توانید بازه دقیق خود را انتخاب کنید.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setUnit("HOURLY")}
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              unit === "HOURLY" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"
            }`}
          >
            رزرو ساعتی
          </button>
          <button
            onClick={() => setUnit("DAILY")}
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              unit === "DAILY" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"
            }`}
          >
            رزرو روزانه
          </button>
        </div>

        <ReservationCalendar
          serverId={serverId}
          unit={unit}
          onSelectionChange={(value) => setSelection(value)}
        />

        <div className="mt-5 rounded-xl bg-[#D9D9D9] p-4 text-sm font-bold text-slate-700">
          {selection ? (
            <>
              <p>بازه انتخابی نهایی:</p>
              <p>شروع: {new Date(selection.startAt).toLocaleString("fa-IR")}</p>
              <p>پایان: {new Date(selection.endAt).toLocaleString("fa-IR")}</p>
              <Link href={checkoutHref} className="mt-3 inline-block rounded-md bg-[#244BC5] px-3 py-2 text-white">
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
