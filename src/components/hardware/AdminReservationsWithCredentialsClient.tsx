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

function normalizeReservationId(
  list: AdminReservation[],
  selectedReservationId: number | string | null
): number | string | null {
  if (list.length === 0) return null;
  if (selectedReservationId === null) return list[0].reservationId;
  const exists = list.some((item) => item.reservationId === selectedReservationId);
  return exists ? selectedReservationId : list[0].reservationId;
}

function rowKey(item: AdminReservation, index: number): string {
  return `${item.reservationId}-${index}`;
}

function sortReservations(list: AdminReservation[]): AdminReservation[] {
  return [...list].sort((a, b) => {
    const x = a.reservationId;
    const y = b.reservationId;
    if (typeof x === "number" && typeof y === "number") return y - x;
    return String(y).localeCompare(String(x));
  });
}

function resolveVisibleReservations(list: AdminReservation[], limit?: number): AdminReservation[] {
  if (typeof limit === "number") return list.slice(0, limit);
  return list;
}

const IP_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9._-]{1,31}$/;
const PASSWORD_MIN_LENGTH = 6;

interface ValidationErrors {
  ipAddress?: string;
  username?: string;
  password?: string;
}

function validateIP(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "آدرس IP الزامی است";
  if (!IP_REGEX.test(trimmed)) return "فرمت IP نامعتبر است (مثال: 192.168.1.1)";
  return undefined;
}

function validateUsername(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "نام کاربری الزامی است";
  if (trimmed.length < 2) return "نام کاربری حداقل ۲ کاراکتر باشد";
  if (trimmed.length > 32) return "نام کاربری حداکثر ۳۲ کاراکتر باشد";
  if (!USERNAME_REGEX.test(trimmed)) return "نام کاربری فقط حروف انگلیسی، عدد، . _ - مجاز است";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "رمز عبور الزامی است";
  if (trimmed.length < PASSWORD_MIN_LENGTH) return `رمز عبور حداقل ${PASSWORD_MIN_LENGTH} کاراکتر باشد`;
  return undefined;
}

function validateAllFields(ipAddress: string, username: string, password: string): ValidationErrors {
  return {
    ipAddress: validateIP(ipAddress),
    username: validateUsername(username),
    password: validatePassword(password),
  };
}

function hasNoErrors(errors: ValidationErrors): boolean {
  return !errors.ipAddress && !errors.username && !errors.password;
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

export default function AdminReservationsWithCredentialsClient({
  limit,
}: AdminReservationsWithCredentialsClientProps) {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservationId, setSelectedReservationId] = useState<number | string | null>(null);
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    setErrors({});
    setTouched({});
  }, [selectedReservation]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateAllFields(ipAddress, username, password));
  };

  const submitCredentials = async () => {
    if (!selectedReservationId) return;

    const validationErrors = validateAllFields(ipAddress, username, password);
    setErrors(validationErrors);
    setTouched({ ipAddress: true, username: true, password: true });

    if (!hasNoErrors(validationErrors)) {
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
    <div className="space-y-6">
      {/* Reservations Table with selectable rows */}
      <div className="admin-table-shell">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="w-14">#</th>
              <th>کاربر</th>
              <th>سرور</th>
              <th>شروع</th>
              <th>پایان</th>
              <th>زمان باقیمانده</th>
              <th>دسترسی</th>
            </tr>
          </thead>
          <tbody>
            {visibleReservations.map((item, index) => {
              const isSelected = item.reservationId === selectedReservationId;
              return (
                <tr
                  key={rowKey(item, index)}
                  onClick={() => setSelectedReservationId(item.reservationId)}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-[#edf2ff] ring-2 ring-inset ring-[#244BC5]/30" : "hover:bg-slate-50"}`}
                >
                  <td className="text-center">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${isSelected ? "bg-[#244BC5] text-white" : "bg-[#edf2ff] text-[#244BC5]"}`}>
                      {(index + 1).toLocaleString("fa-IR")}
                    </span>
                  </td>
                  <td>
                    <div className="font-bold text-slate-800">{item.userFullName}</div>
                    <div className="mt-0.5 text-xs text-slate-500" dir="ltr">{item.userPhone || "-"}</div>
                  </td>
                  <td className="font-medium text-slate-700">{item.serverName}</td>
                  <td className="text-sm text-slate-600">{formatDateTime(item.startAt)}</td>
                  <td className="text-sm text-slate-600">{formatDateTime(item.endAt)}</td>
                  <td>
                    <span className={`text-sm font-medium ${formatRemaining(item.endAt) === "پایان یافته" ? "text-red-500" : "text-emerald-600"}`}>
                      {formatRemaining(item.endAt)}
                    </span>
                  </td>
                  <td className="text-sm text-slate-600">
                    {item.username && item.ipAddress ? (
                      <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">تنظیم شده</span>
                    ) : (
                      <span className="rounded bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">نیاز به تنظیم</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Credential Form - shown when a row is selected */}
      {selectedReservationId && (
        <div className="admin-form-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-base font-extrabold text-[#1d3ca1]">تنظیم اطلاعات دسترسی</p>
              <p className="mt-1 text-xs font-bold text-slate-500">
                رزرو انتخاب شده: {selectedReservation?.userFullName} / {selectedReservation?.serverName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedReservationId(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              لغو انتخاب
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="admin-form-group">
              <label className="admin-form-label">آدرس IP</label>
              <input
                value={ipAddress}
                onChange={(event) => setIpAddress(event.target.value)}
                onBlur={() => handleBlur("ipAddress")}
                className={`input-shell ${touched.ipAddress && errors.ipAddress ? "border-red-400 focus:border-red-500" : ""}`}
                placeholder="192.168.1.1"
                dir="ltr"
              />
              {touched.ipAddress && errors.ipAddress && (
                <span className="mt-1 text-xs font-bold text-red-500">{errors.ipAddress}</span>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">نام کاربری</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                onBlur={() => handleBlur("username")}
                className={`input-shell ${touched.username && errors.username ? "border-red-400 focus:border-red-500" : ""}`}
                placeholder="root"
                dir="ltr"
              />
              {touched.username && errors.username && (
                <span className="mt-1 text-xs font-bold text-red-500">{errors.username}</span>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">رمز عبور</label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() => handleBlur("password")}
                className={`input-shell ${touched.password && errors.password ? "border-red-400 focus:border-red-500" : ""}`}
                placeholder="••••••••"
                type="password"
                dir="ltr"
              />
              {touched.password && errors.password && (
                <span className="mt-1 text-xs font-bold text-red-500">{errors.password}</span>
              )}
            </div>

            <div className="admin-form-group flex items-end">
              <button
                type="button"
                onClick={submitCredentials}
                disabled={saving}
                className="primary-btn w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "در حال ثبت..." : "ذخیره"}
              </button>
            </div>
          </div>

          {message && (
            <p className={`mt-3 text-xs font-bold ${message.includes("موفقیت") ? "text-emerald-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
