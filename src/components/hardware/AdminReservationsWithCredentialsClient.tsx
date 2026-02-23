"use client";

import { useEffect, useMemo, useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";
import type { AdminReservation } from "@/types/hardware";

interface AdminReservationsWithCredentialsClientProps {
  limit?: number;
}

function formatDateTime(value: string): string {
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

export default function AdminReservationsWithCredentialsClient({
  limit,
}: AdminReservationsWithCredentialsClientProps) {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [messageByReservation, setMessageByReservation] = useState<Record<number, string>>({});
  const [formByReservation, setFormByReservation] = useState<
    Record<number, { ipAddress: string; username: string; password: string }>
  >({});

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await hardwareApi.getAdminReservations();
      setReservations(list);
      setFormByReservation((previous) => {
        const next = { ...previous };
        list.forEach((item) => {
          next[item.reservationId] = {
            ipAddress: previous[item.reservationId]?.ipAddress ?? item.ipAddress ?? "",
            username: previous[item.reservationId]?.username ?? item.username ?? "",
            password: previous[item.reservationId]?.password ?? item.password ?? "",
          };
        });
        return next;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const visibleReservations = useMemo(
    () => (typeof limit === "number" ? reservations.slice(0, limit) : reservations),
    [limit, reservations]
  );

  const updateFormField = (
    reservationId: number,
    field: "ipAddress" | "username" | "password",
    value: string
  ) => {
    setFormByReservation((previous) => ({
      ...previous,
      [reservationId]: {
        ipAddress: previous[reservationId]?.ipAddress ?? "",
        username: previous[reservationId]?.username ?? "",
        password: previous[reservationId]?.password ?? "",
        [field]: value,
      },
    }));
    setMessageByReservation((previous) => ({ ...previous, [reservationId]: "" }));
  };

  const submitCredentials = async (reservationId: number) => {
    const form = formByReservation[reservationId] ?? { ipAddress: "", username: "", password: "" };
    if (!form.ipAddress.trim() || !form.username.trim() || !form.password.trim()) {
      setMessageByReservation((previous) => ({
        ...previous,
        [reservationId]: "لطفا IP، نام کاربری و رمز عبور را کامل وارد کنید.",
      }));
      return;
    }

    try {
      setSavingId(reservationId);
      await hardwareApi.assignServiceCredentials({
        reservationId,
        ipAddress: form.ipAddress.trim(),
        username: form.username.trim(),
        password: form.password.trim(),
      });
      setMessageByReservation((previous) => ({
        ...previous,
        [reservationId]: "اطلاعات ورود با موفقیت ثبت شد.",
      }));
      await refresh();
    } catch (error) {
      console.log(error);
      setMessageByReservation((previous) => ({
        ...previous,
        [reservationId]: "ثبت اطلاعات ورود ناموفق بود. دوباره تلاش کنید.",
      }));
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="muted-panel mt-5 text-sm font-bold text-slate-700">در حال بارگذاری لیست رزروها...</div>
    );
  }

  if (visibleReservations.length === 0) {
    return (
      <div className="muted-panel mt-5 text-sm font-bold text-slate-700">رزروی برای نمایش وجود ندارد.</div>
    );
  }

  return (
    <div className="mt-5 grid gap-3">
      {visibleReservations.map((item, index) => (
        <div key={item.reservationId} className="muted-panel relative">
          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700">
            {index + 1}
          </span>

          <div className="pl-10">
            <p className="text-base font-extrabold text-[#1f2f67]">رزرو #{item.reservationId}</p>
            <p className="mt-1 text-sm font-bold text-slate-600">کاربر: {item.userFullName}</p>
            <p className="text-sm font-bold text-slate-600">سرور: {item.serverName}</p>
            <p className="text-sm font-bold text-slate-500">
              {formatDateTime(item.startAt)} تا {formatDateTime(item.endAt)}
            </p>

            <div className="mt-4 grid gap-2 rounded-xl border border-slate-200 bg-white/80 p-3">
              <p className="text-xs font-extrabold text-slate-500">ثبت اطلاعات ورود این رزرو</p>
              <input
                value={formByReservation[item.reservationId]?.ipAddress ?? ""}
                onChange={(event) =>
                  updateFormField(item.reservationId, "ipAddress", event.target.value)
                }
                className="input-shell"
                placeholder="IP سرور"
              />
              <input
                value={formByReservation[item.reservationId]?.username ?? ""}
                onChange={(event) =>
                  updateFormField(item.reservationId, "username", event.target.value)
                }
                className="input-shell"
                placeholder="نام کاربری"
              />
              <input
                value={formByReservation[item.reservationId]?.password ?? ""}
                onChange={(event) =>
                  updateFormField(item.reservationId, "password", event.target.value)
                }
                className="input-shell"
                placeholder="رمز عبور"
              />
              <button
                type="button"
                onClick={() => submitCredentials(item.reservationId)}
                disabled={savingId === item.reservationId}
                className="primary-btn w-fit disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingId === item.reservationId ? "در حال ثبت..." : "ذخیره اطلاعات ورود"}
              </button>
              {messageByReservation[item.reservationId] ? (
                <p className="text-xs font-bold text-slate-600">{messageByReservation[item.reservationId]}</p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
