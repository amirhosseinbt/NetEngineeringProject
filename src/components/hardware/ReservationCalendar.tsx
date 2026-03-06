"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { hardwareApi } from "@/services/hardwareApi";
import type { CalendarDayAvailability, RentalUnit, TimeSlot } from "@/types/hardware";

interface ReservationCalendarProps {
  serverId: number | string;
  unit: RentalUnit;
  onSelectionChange: (value: { startAt: string; endAt: string } | null) => void;
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

function toDateKey(value: Date): string {
  return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`;
}

function parseDateKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0);
}

function monthKey(value: Date): string {
  return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}`;
}

function startOfMonth(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), 1);
}

function formatDayNumber(dateKey: string): string {
  const date = parseDateKey(dateKey);
  return new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(date);
}

function formatMonthTitle(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR", { month: "long", year: "numeric" }).format(date);
}

function formatDateLabel(dateKey: string): string {
  const date = parseDateKey(dateKey);
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function formatTimeLabel(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function getWeekIndex(jsDay: number): number {
  return (jsDay + 1) % 7;
}

function buildCalendarGrid(displayMonth: Date): Array<string | null> {
  const first = startOfMonth(displayMonth);
  const firstIndex = getWeekIndex(first.getDay());
  const daysCount = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();

  const cells: Array<string | null> = [];
  for (let i = 0; i < firstIndex; i += 1) cells.push(null);

  for (let day = 1; day <= daysCount; day += 1) {
    cells.push(toDateKey(new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)));
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isRangeBlocked(
  fromKey: string,
  toKey: string,
  statusMap: Record<string, CalendarDayAvailability["status"]>
): boolean {
  const from = parseDateKey(fromKey);
  const to = parseDateKey(toKey);

  const current = new Date(from);
  while (current <= to) {
    const key = toDateKey(current);
    if (statusMap[key] === "reserved") return true;
    current.setDate(current.getDate() + 1);
  }

  return false;
}

function hasReservedSlotBetween(slots: TimeSlot[], startIndex: number, endIndex: number): boolean {
  for (let i = startIndex; i <= endIndex; i += 1) {
    if (slots[i].isReserved) return true;
  }
  return false;
}

function addDays(dateKey: string, days: number): string {
  const d = parseDateKey(dateKey);
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

/** Human-readable duration for display (e.g. "۲ ساعت", "۳ روز"). */
function formatDurationLabel(startAt: string, endAt: string, unit: "HOURLY" | "DAILY"): string {
  const start = new Date(startAt);
  const end = new Date(endAt);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return "";
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (unit === "DAILY" && days >= 1) return `${days.toLocaleString("fa-IR")} روز`;
  if (hours < 24) return `${hours.toLocaleString("fa-IR")} ساعت`;
  return `${days.toLocaleString("fa-IR")} روز`;
}

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const DAILY_DURATION_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export default function ReservationCalendar({ serverId, unit, onSelectionChange }: ReservationCalendarProps) {
  const [displayMonth, setDisplayMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [availability, setAvailability] = useState<CalendarDayAvailability[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);

  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotStartIndex, setSlotStartIndex] = useState<number | null>(null);
  const [slotEndIndex, setSlotEndIndex] = useState<number | null>(null);

  const [dayStartKey, setDayStartKey] = useState<string | null>(null);
  const [dayEndKey, setDayEndKey] = useState<string | null>(null);
  /** For DAILY: number of days to reserve (1–7). User picks duration then clicks start day. */
  const [dailyDurationDays, setDailyDurationDays] = useState<number>(1);

  const availabilityMap = useMemo(() => {
    const map: Record<string, CalendarDayAvailability["status"]> = {};
    availability.forEach((item) => {
      map[item.date] = item.status;
    });
    return map;
  }, [availability]);

  const grid = useMemo(() => buildCalendarGrid(displayMonth), [displayMonth]);

  useEffect(() => {
    const run = async () => {
      setLoadingDays(true);
      onSelectionChange(null);
      setSelectedDateKey(null);
      setSlots([]);
      setSlotStartIndex(null);
      setSlotEndIndex(null);
      setDayStartKey(null);
      setDayEndKey(null);

      try {
        const data = await hardwareApi.getMonthAvailability(serverId, {
          unit,
          month: monthKey(displayMonth),
        });
        setAvailability(data);
      } finally {
        setLoadingDays(false);
      }
    };

    run();
  }, [displayMonth, serverId, unit, onSelectionChange]);

  useEffect(() => {
    if (unit !== "HOURLY" || !selectedDateKey) {
      setSlots([]);
      setSlotStartIndex(null);
      setSlotEndIndex(null);
      return;
    }

    const run = async () => {
      setLoadingSlots(true);
      onSelectionChange(null);

      try {
        const data = await hardwareApi.getServerTimeSlots(serverId, {
          unit: "HOURLY",
          date: selectedDateKey,
        });
        setSlots(data);
      } finally {
        setLoadingSlots(false);
      }
    };

    run();
  }, [onSelectionChange, selectedDateKey, serverId, unit]);

  const applyDailySelection = useCallback(
    (startKey: string, endKey: string) => {
      if (isRangeBlocked(startKey, endKey, availabilityMap)) {
        toast.error("در بازه انتخابی روز رزرو شده وجود دارد.");
        return;
      }
      setDayStartKey(startKey);
      setDayEndKey(endKey);
      const start = parseDateKey(startKey);
      const end = parseDateKey(endKey);
      end.setDate(end.getDate() + 1);
      onSelectionChange({ startAt: start.toISOString(), endAt: end.toISOString() });
    },
    [availabilityMap, onSelectionChange]
  );

  const handleDailyDurationChange = useCallback(
    (days: number) => {
      setDailyDurationDays(days);
      if (!dayStartKey) return;
      const endKey = addDays(dayStartKey, days - 1);
      if (isRangeBlocked(dayStartKey, endKey, availabilityMap)) {
        toast.error("در بازه انتخابی روز رزرو شده وجود دارد.");
        return;
      }
      setDayEndKey(endKey);
      const start = parseDateKey(dayStartKey);
      const end = parseDateKey(endKey);
      end.setDate(end.getDate() + 1);
      onSelectionChange({ startAt: start.toISOString(), endAt: end.toISOString() });
    },
    [dayStartKey, availabilityMap, onSelectionChange]
  );

  const handleDayClick = (dateKey: string) => {
    const status = availabilityMap[dateKey];
    if (!status || status === "reserved") return;

    if (unit === "HOURLY") {
      setSelectedDateKey(dateKey);
      return;
    }

    // DAILY: one click = start day; end = start + (duration - 1) days
    const endKey = addDays(dateKey, dailyDurationDays - 1);
    applyDailySelection(dateKey, endKey);
  };

  const handleSlotClick = (index: number) => {
    if (slots[index]?.isReserved) return;

    if (slotStartIndex === null) {
      setSlotStartIndex(index);
      setSlotEndIndex(index);
      onSelectionChange({ startAt: slots[index].startAt, endAt: slots[index].endAt });
      return;
    }

    const start = Math.min(slotStartIndex, index);
    const end = Math.max(slotStartIndex, index);

    if (hasReservedSlotBetween(slots, start, end)) {
      toast.error("بین بازه انتخابی، ساعت رزرو شده وجود دارد.");
      setSlotStartIndex(index);
      setSlotEndIndex(index);
      onSelectionChange({ startAt: slots[index].startAt, endAt: slots[index].endAt });
      return;
    }

    setSlotStartIndex(start);
    setSlotEndIndex(end);
    onSelectionChange({ startAt: slots[start].startAt, endAt: slots[end].endAt });
  };

  const monthTitle = formatMonthTitle(displayMonth);

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <div className="muted-panel">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            className="secondary-btn px-3 py-1"
          >
            ماه قبل
          </button>
          <p className="text-base font-bold text-slate-800">{monthTitle}</p>
          <button
            onClick={() => setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            className="secondary-btn px-3 py-1"
          >
            ماه بعد
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((item) => (
            <div key={item} className="rounded-md bg-white py-2 text-center text-xs font-bold text-slate-700">
              {item}
            </div>
          ))}

          {grid.map((dateKey, index) => {
            if (!dateKey) {
              return <div key={`empty-${index}`} className="h-12 rounded-md bg-slate-100" />;
            }

            const status = availabilityMap[dateKey];
            const isReserved = status === "reserved";
            const isSelectedHourly = unit === "HOURLY" && selectedDateKey === dateKey;
            const isInDailyRange =
              unit === "DAILY" &&
              dayStartKey &&
              dayEndKey &&
              dateKey >= dayStartKey &&
              dateKey <= dayEndKey;

            const baseClass = isReserved
              ? "bg-red-100 text-red-700"
              : status === "partial"
                ? "bg-amber-100 text-amber-700"
                : "bg-white text-slate-800";

            const selectedClass =
              isSelectedHourly || isInDailyRange ? "outline outline-2 outline-[#244BC5]" : "";

            return (
              <button
                key={dateKey}
                disabled={isReserved || loadingDays}
                onClick={() => handleDayClick(dateKey)}
                className={`h-12 rounded-md text-center text-sm font-bold ${baseClass} ${selectedClass} ${
                  isReserved ? "cursor-not-allowed" : "hover:brightness-95"
                }`}
                title={formatDateLabel(dateKey)}
              >
                {formatDayNumber(dateKey)}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700">آزاد</span>
          <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-700">نیمه پر (برای رزرو ساعتی)</span>
          <span className="rounded-md bg-red-100 px-2 py-1 text-red-700">رزرو شده</span>
        </div>
      </div>

      <div className="muted-panel">
        {unit === "DAILY" && (
          <div className="space-y-3 text-sm font-bold text-slate-700">
            <p className="text-slate-800">رزرو روزانه</p>
            <p className="text-slate-600 font-normal text-xs">
              مدت رزرو را انتخاب کنید، سپس روز شروع را در تقویم کلیک کنید.
            </p>
            <div className="rounded-md bg-white p-3 space-y-2">
              <label htmlFor="calendar-duration-days" className="block text-slate-700">
                مدت رزرو (روز)
              </label>
              <select
                id="calendar-duration-days"
                value={dailyDurationDays}
                onChange={(e) => handleDailyDurationChange(Number(e.target.value))}
                className="calendar-duration-select"
                dir="rtl"
              >
                {DAILY_DURATION_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n.toLocaleString("fa-IR")} روز
                  </option>
                ))}
              </select>
            </div>
            {dayStartKey && dayEndKey ? (
              <div className="rounded-md bg-white p-3 space-y-1">
                <p>از: {formatDateLabel(dayStartKey)}</p>
                <p>تا: {formatDateLabel(dayEndKey)}</p>
                <p className="text-[#244BC5] font-bold pt-1">
                  مدت انتخاب شده: {formatDurationLabel(
                    parseDateKey(dayStartKey).toISOString(),
                    new Date(parseDateKey(dayEndKey).getTime() + 24 * 60 * 60 * 1000).toISOString(),
                    "DAILY"
                  )}
                </p>
              </div>
            ) : (
              <p className="rounded-md bg-white p-3 text-slate-500 font-normal">روز شروع را در تقویم کلیک کنید.</p>
            )}
          </div>
        )}

        {unit === "HOURLY" && (
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">رزرو ساعتی</p>
            <p className="text-xs text-slate-600 font-normal">
              برای انتخاب مدت: ابتدا یک روز انتخاب کنید، سپس ساعت شروع و ساعت پایان را کلیک کنید (بازه زمانی).
            </p>

            {selectedDateKey && (
              <p className="rounded-md bg-white p-2 text-sm font-bold text-slate-700">
                تاریخ انتخابی: {formatDateLabel(selectedDateKey)}
              </p>
            )}
            {slotStartIndex !== null && slotEndIndex !== null && slots[slotStartIndex] && slots[slotEndIndex] && (
              <p className="text-sm font-bold text-[#244BC5] rounded-md bg-white p-2">
                مدت انتخاب شده: {formatDurationLabel(slots[slotStartIndex].startAt, slots[slotEndIndex].endAt, "HOURLY")}
              </p>
            )}

            <div className="grid gap-2">
              {loadingSlots && <p className="rounded-md bg-white p-3 text-sm font-bold text-slate-700">در حال بارگذاری ساعت ها...</p>}

              {!loadingSlots && selectedDateKey && slots.length === 0 && (
                <p className="rounded-md bg-white p-3 text-sm font-bold text-slate-700">ساعت قابل رزرو پیدا نشد.</p>
              )}

              {!loadingSlots &&
                slots.map((slot, index) => {
                  const isSelected =
                    slotStartIndex !== null &&
                    slotEndIndex !== null &&
                    index >= slotStartIndex &&
                    index <= slotEndIndex;

                  return (
                    <button
                      key={`${slot.startAt}-${slot.endAt}`}
                      disabled={slot.isReserved}
                      onClick={() => handleSlotClick(index)}
                    className={`rounded-md p-2 text-right text-sm font-bold transition ${
                      slot.isReserved
                        ? "cursor-not-allowed bg-red-100 text-red-700"
                        : isSelected
                            ? "bg-[#244BC5] text-white shadow"
                            : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                    >
                      {formatTimeLabel(slot.startAt)} تا {formatTimeLabel(slot.endAt)}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
