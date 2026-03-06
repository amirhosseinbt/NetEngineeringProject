"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Hash, Server, Clock, CreditCard } from "lucide-react";
import { hardwareApi } from "@/services/hardwareApi";
import type { AdminReservation, AdminUser, HardwareServer } from "@/types/hardware";

function formatDateTime(date: string | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("fa-IR") + " - " + d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    AVAILABLE: { bg: "bg-emerald-50", text: "text-emerald-600", label: "فعال" },
    MAINTENANCE: { bg: "bg-amber-50", text: "text-amber-600", label: "در حال تعمیر" },
    DISABLED: { bg: "bg-slate-100", text: "text-slate-500", label: "غیرفعال" },
    PENDING: { bg: "bg-amber-50", text: "text-amber-600", label: "در انتظار" },
    CONFIRMED: { bg: "bg-blue-50", text: "text-blue-600", label: "تایید شده" },
    ACTIVE: { bg: "bg-emerald-50", text: "text-emerald-600", label: "فعال" },
    COMPLETED: { bg: "bg-slate-100", text: "text-slate-600", label: "تکمیل شده" },
    CANCELLED: { bg: "bg-red-50", text: "text-red-500", label: "لغو شده" },
  };
  const style = map[status] || { bg: "bg-slate-100", text: "text-slate-500", label: status };
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

export default function AdminTablesClient({
  mode,
}: {
  mode: "servers" | "users" | "reservations";
}) {
  const [servers, setServers] = useState<HardwareServer[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        if (mode === "servers") setServers(await hardwareApi.getAdminServers());
        if (mode === "users") setUsers(await hardwareApi.getAdminUsers());
        if (mode === "reservations") setReservations(await hardwareApi.getAdminReservations());
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [mode]);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-[#d9e4ff] bg-white/60">
        <div className="text-sm font-bold text-slate-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <>
      {mode === "servers" && (
        <div className="admin-table-shell">
          <table className="admin-table">
            <thead>
              <tr>
                <th>نام سرور</th>
                <th>پردازنده</th>
                <th>کارت گرافیک</th>
                <th>حافظه</th>
                <th>قیمت</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {servers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    سروری یافت نشد.
                  </td>
                </tr>
              )}
              {servers.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="font-bold text-slate-800">{s.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{s.os}</div>
                  </td>
                  <td className="text-sm text-slate-600">{s.cpu}</td>
                  <td className="text-sm text-slate-600">{s.gpu || "-"}</td>
                  <td className="text-sm text-slate-600">
                    <div>{s.ramGb} GB RAM</div>
                    <div className="text-xs text-slate-500">{s.diskGb} GB Disk</div>
                  </td>
                  <td className="text-sm">
                    <div className="font-medium text-slate-700">{s.hourlyPrice.toLocaleString("fa-IR")} / ساعت</div>
                    <div className="text-xs text-slate-500">{s.dailyPrice.toLocaleString("fa-IR")} / روز</div>
                  </td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mode === "users" && (
        <div className="admin-table-shell">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-14">
                  <Hash size={14} className="mx-auto" />
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    نام کاربر
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} />
                    شماره تماس
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} />
                    ایمیل
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    تاریخ عضویت
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    کاربری یافت نشد.
                  </td>
                </tr>
              )}
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td className="text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf2ff] text-xs font-bold text-[#244BC5]">
                      {(index + 1).toLocaleString("fa-IR")}
                    </span>
                  </td>
                  <td className="font-bold text-slate-800">{u.fullName}</td>
                  <td dir="ltr" className="text-slate-600">{u.phoneNumber}</td>
                  <td className="text-slate-600">{u.email || "-"}</td>
                  <td className="text-slate-600">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString("fa-IR") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mode === "reservations" && (
        <div className="admin-table-shell">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-14">
                  <Hash size={14} className="mx-auto" />
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    کاربر
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <Server size={14} />
                    سرور
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    شروع
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    پایان
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={14} />
                    مبلغ
                  </span>
                </th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    رزروی یافت نشد.
                  </td>
                </tr>
              )}
              {reservations.map((r, index) => (
                <tr key={r.reservationId}>
                  <td className="text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf2ff] text-xs font-bold text-[#244BC5]">
                      {(index + 1).toLocaleString("fa-IR")}
                    </span>
                  </td>
                  <td>
                    <div className="font-bold text-slate-800">{r.userFullName}</div>
                    <div className="mt-0.5 text-xs text-slate-500" dir="ltr">{r.userPhone || "-"}</div>
                  </td>
                  <td className="font-medium text-slate-700">{r.serverName}</td>
                  <td className="text-sm text-slate-600">{formatDateTime(r.startAt)}</td>
                  <td className="text-sm text-slate-600">{formatDateTime(r.endAt)}</td>
                  <td className="text-sm font-medium text-slate-700">
                    {r.totalAmount ? r.totalAmount.toLocaleString("fa-IR") + " تومان" : "-"}
                  </td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
