"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { hardwareApi } from "@/services/hardwareApi";
import { getBackendErrorMessage } from "@/lib/apiError";
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
  });
}

function formatRemaining(endAt: string): string {
  const end = new Date(endAt).getTime();
  if (Number.isNaN(end)) return "-";
  const diff = end - Date.now();
  if (diff <= 0) return "پایان یافته";

  const day = 1000 * 60 * 60 * 24;
  const month = day * 30;
  const months = Math.floor(diff / month);
  const days = Math.floor((diff % month) / day);

  if (months > 0) return `${months} ماه و ${days} روز`;
  return `${Math.max(days, 1)} روز`;
}

function mask(value?: string | null): string {
  if (!value) return "تنظیم نشده";
  if (value.length <= 4) return value;
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value);
}

function formatReservationLabel(item: AdminReservation): string {
  return `#${formatNumber(item.reservationId)} - ${item.userFullName}`;
}

function formatUserServer(item: AdminReservation): string {
  return `${item.userFullName} / ${item.serverName}`;
}

function formatCredential(item: AdminReservation): string {
  if (!item.username || !item.ipAddress) return "تنظیم نشده";
  return `${item.username} @ ${item.ipAddress}`;
}

function formatTableDate(item: AdminReservation): string {
  return `${formatDateTime(item.startAt)} تا ${formatDateTime(item.endAt)}`;
}

function formatSelectedMessage(item: AdminReservation | null): string {
  if (!item) return "";
  if (item.username && item.password && item.ipAddress) {
    return `ورود فعلی: ${item.username} @ ${item.ipAddress} - رمز: ${mask(item.password)}`;
  }
  return "برای این رزرو هنوز اطلاعات ورود تنظیم نشده است.";
}

function toReservationId(value: string): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function normalizeReservationId(
  list: AdminReservation[],
  selectedReservationId: number | null
): number | null {
  if (list.length === 0) return null;
  if (selectedReservationId === null) return list[0].reservationId;
  const exists = list.some((item) => item.reservationId === selectedReservationId);
  return exists ? selectedReservationId : list[0].reservationId;
}

function rowKey(item: AdminReservation, index: number): string {
  return `${item.reservationId}-${index}`;
}

function sortReservations(list: AdminReservation[]): AdminReservation[] {
  return [...list].sort((a, b) => b.reservationId - a.reservationId);
}

function resolveVisibleReservations(list: AdminReservation[], limit?: number): AdminReservation[] {
  if (typeof limit === "number") return list.slice(0, limit);
  return list;
}

function validateCredentialFields(ipAddress: string, username: string, password: string): boolean {
  return ipAddress.trim().length > 0 && username.trim().length > 0 && password.trim().length > 0;
}

function emptyForm() {
  return { ipAddress: "", username: "", password: "" };
}

function fillFormFromReservation(item: AdminReservation | null) {
  if (!item) return emptyForm();
  return {
    ipAddress: item.ipAddress ?? "",
    username: item.username ?? "",
    password: item.password ?? "",
  };
}

function isNoReservation(list: AdminReservation[]): boolean {
  return list.length === 0;
}

function loadingPanel() {
  return (
    <div className="muted-panel mt-5 text-sm font-bold text-slate-700">در حال بارگذاری لیست رزروها...</div>
  );
}

function emptyPanel() {
  return (
    <div className="muted-panel mt-5 text-sm font-bold text-slate-700">رزروی برای نمایش وجود ندارد.</div>
  );
}

function currentCredentialLine(item: AdminReservation | null) {
  const text = formatSelectedMessage(item);
  if (!text) return null;
  return <p className="mt-2 text-xs font-bold text-slate-500">{text}</p>;
}

function formTitle() {
  return (
    <div className="mb-3">
      <p className="text-sm font-extrabold text-slate-700">ثبت اطلاعات ورود (فرم واحد)</p>
      <p className="mt-1 text-xs font-bold text-slate-500">
        رزرو را انتخاب کنید و IP، نام کاربری و رمز عبور را ثبت کنید.
      </p>
    </div>
  );
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
      const list = sortReservations(await hardwareApi.getAdminReservations());
      setReservations(list);
      setSelectedReservationId((prev) => normalizeReservationId(list, prev));
    } catch (error) {
      toast.error(getBackendErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const visibleReservations = useMemo(() => resolveVisibleReservations(reservations, limit), [limit, reservations]);

  const selectedReservation = useMemo(
    () =>
      reservations.find((item) => item.reservationId === selectedReservationId) ??
      visibleReservations.find((item) => item.reservationId === selectedReservationId) ??
      null,
    [reservations, selectedReservationId, visibleReservations]
  );

  useEffect(() => {
    const form = fillFormFromReservation(selectedReservation);
    setIpAddress(form.ipAddress);
    setUsername(form.username);
    setPassword(form.password);
    setMessage("");
  }, [selectedReservation]);

  const submitCredentials = async () => {
    if (!selectedReservationId) return;
    if (!validateCredentialFields(ipAddress, username, password)) {
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
      setMessage(getBackendErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return loadingPanel();

  if (isNoReservation(visibleReservations)) return emptyPanel();

  return (
    <div className="mt-5 grid gap-3">
      <div className="admin-credential-card">
        {formTitle()}
        <div className="grid gap-2 md:grid-cols-2">
          <select
            className="input-shell"
            value={selectedReservationId ?? ""}
            onChange={(event) => setSelectedReservationId(toReservationId(event.target.value))}
          >
            {visibleReservations.map((item) => (
              <option key={item.reservationId} value={item.reservationId}>
                {formatReservationLabel(item)}
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
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
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
        {currentCredentialLine(selectedReservation)}
      </div>

      <div className="admin-table-shell">
        <table className="admin-table">
          <thead>
            <tr>
              <th>کاربر / سرور</th>
              <th>بازه رزرو</th>
              <th>زمان باقی مانده</th>
              <th>اطلاعات ورود</th>
            </tr>
          </thead>
          <tbody>
            {visibleReservations.map((item, index) => (
              <tr key={rowKey(item, index)}>
                <td>{formatUserServer(item)}</td>
                <td>{formatTableDate(item)}</td>
                <td>{formatRemaining(item.endAt)}</td>
                <td>{formatCredential(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
