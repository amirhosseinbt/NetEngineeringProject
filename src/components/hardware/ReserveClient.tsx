"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";
import type { RentalUnit, TimeSlot } from "@/types/hardware";

export default function ReserveClient({ serverId }: { serverId: number }) {
  const [unit, setUnit] = useState<RentalUnit>("HOURLY");
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      const data = await hardwareApi.getServerTimeSlots(serverId, {
        unit,
        date: "2026-02-24",
      });
      setSlots(data);
      setSelectedIndex(null);
    };

    run();
  }, [serverId, unit]);

  const selected = useMemo(
    () => (selectedIndex === null ? null : slots[selectedIndex]),
    [selectedIndex, slots]
  );

  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#244BC5]">رزرو سرور #{serverId}</h1>
        <p className="mt-2 text-sm text-slate-600">
          نوع رزرو را انتخاب کنید و یکی از بازه های آزاد را بردارید. بازه های رزرو شده غیرفعال هستند.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setUnit("HOURLY")}
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              unit === "HOURLY" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"
            }`}
          >
            ساعتی
          </button>
          <button
            onClick={() => setUnit("DAILY")}
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              unit === "DAILY" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"
            }`}
          >
            روزانه
          </button>
        </div>

        <div className="mt-5 grid gap-2">
          {slots.map((slot, index) => (
            <button
              key={`${slot.startAt}-${slot.endAt}`}
              disabled={slot.isReserved}
              onClick={() => setSelectedIndex(index)}
              className={`rounded-md p-3 text-right text-sm font-bold ${
                slot.isReserved
                  ? "cursor-not-allowed bg-red-100 text-red-700"
                  : selectedIndex === index
                    ? "bg-[#D9E2FF] text-slate-900 outline outline-1 outline-[#244BC5]"
                    : "bg-[#D9D9D9] text-slate-700"
              }`}
            >
              {slot.startAt} {":"} {slot.endAt} {slot.isReserved ? "(رزرو شده)" : "(آزاد)"}
            </button>
          ))}
        </div>

        {selected && (
          <div className="mt-5 rounded-md bg-[#D9D9D9] p-4 text-sm font-bold text-slate-700">
            <p>بازه انتخابی:</p>
            <p>
              {selected.startAt} {":"} {selected.endAt}
            </p>
            <Link
              href={`/hardware/checkout/${serverId}?unit=${unit}&startAt=${encodeURIComponent(
                selected.startAt
              )}&endAt=${encodeURIComponent(selected.endAt)}`}
              className="mt-3 inline-block rounded-md bg-[#244BC5] px-3 py-2 text-white"
            >
              ادامه به تسویه
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
