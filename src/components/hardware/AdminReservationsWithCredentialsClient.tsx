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
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await hardwareApi.getAdminReservations();
      setReservations(list);
      if (list.length > 0 && selectedReservationId === null) {
        setSelectedReservationId(list[0].reservationId);
      }
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

  const selectedReservation = useMemo(
    () =>
      reservations.find((item) => item.reservationId === selectedReservationId) ??
      visibleReservations.find((item) => item.reservationId === selectedReservationId) ??
      null,
    [reservations, selectedReservationId, visibleReservations]
  );

  useEffect(() => {
    if (!selectedReservation) {
      setIpAddress("");
      setUsername("");
      setPassword("");
      return;
    }
    setIpAddress(selectedReservation.ipAddress ?? "");
    setUsername(selectedReservation.username ?? "");
    setPassword(selectedReservation.password ?? "");
    setMessage("");
  }, [selectedReservation]);

  const submitCredentials = async () => {
    if (!selectedReservationId) return;
    if (!ipAddress.trim() || !username.trim() || !password.trim()) {
      setMessage("لطفا IP، نام کاربری و رمز عبور را کامل وارد کنید.");
      return;
    }

    try {
      setSaving(true);
      await hardwareApi.assignServiceCredentials({
        reservationId: selectedReservationId,
        ipAddress: ipAddress.trim(),
        username: username.trim(),
        password: password.trim(),
      });
      setMessage("اطلاعات ورود با موفقیت ثبت شد.");
      await refresh();
    } catch (error) {
      console.log(error);
      setMessage("ثبت اطلاعات ورود ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setSaving(false);
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
      <div className="muted-panel">
        <p className="text-sm font-extrabold text-[#1f2f67]">ثبت اطلاعات ورود (فرم واحد)</p>
        <p className="mt-1 text-xs font-bold text-slate-500">
          رزرو را انتخاب کنید و اطلاعات ورود را ثبت یا ویرایش کنید.
        </p>
        <div className="mt-3 grid gap-2">
          <select
            className="input-shell"
            value={selectedReservationId ?? ""}
            onChange={(event) => setSelectedReservationId(Number(event.target.value))}
          >
            {visibleReservations.map((item) => (
              <option key={item.reservationId} value={item.reservationId}>
                رزرو #{item.reservationId} - {item.userFullName}
              </option>
            ))}
          </select>
          <input
            value={ipAddress}
            onChange={(event) => setIpAddress(event.target.value)}
            className="input-shell"
            placeholder="IP سرور"
          />
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="input-shell"
            placeholder="نام کاربری"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-shell"
            placeholder="رمز عبور"
          />
          <button
            type="button"
            onClick={submitCredentials}
            disabled={saving || !selectedReservationId}
            className="primary-btn w-fit disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "در حال ثبت..." : "ذخیره اطلاعات ورود"}
          </button>
          {message ? <p className="text-xs font-bold text-slate-600">{message}</p> : null}
        </div>
      </div>

      {visibleReservations.map((item, index) => (
        <div key={item.reservationId} className="muted-panel relative">
          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700">
            {index + 1}
          </span>

          <div className="pr-10">
            <p className="text-base font-extrabold text-[#1f2f67]">رزرو #{item.reservationId}</p>
            <p className="mt-1 text-sm font-bold text-slate-600">کاربر: {item.userFullName}</p>
            <p className="text-sm font-bold text-slate-600">سرور: {item.serverName}</p>
            <p className="text-sm font-bold text-slate-500">
              {formatDateTime(item.startAt)} تا {formatDateTime(item.endAt)}
            </p>
            <p className="mt-2 text-xs font-bold text-slate-500">
              ورود:{" "}
              {item.username && item.ipAddress
                ? `${item.username} @ ${item.ipAddress}`
                : "هنوز تنظیم نشده"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
