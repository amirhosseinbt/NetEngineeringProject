"use client";

import { useEffect, useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";
import type { AdminReservation, AdminUser, HardwareServer } from "@/types/hardware";

export default function AdminTablesClient({
  mode,
}: {
  mode: "servers" | "users" | "reservations";
}) {
  const [servers, setServers] = useState<HardwareServer[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [reservations, setReservations] = useState<AdminReservation[]>([]);

  useEffect(() => {
    const run = async () => {
      if (mode === "servers") setServers(await hardwareApi.getAdminServers());
      if (mode === "users") setUsers(await hardwareApi.getAdminUsers());
      if (mode === "reservations") setReservations(await hardwareApi.getAdminReservations());
    };
    run();
  }, [mode]);

  return (
    <div className="table-shell mt-5">
      {mode === "servers" && (
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">نام سرور</th>
              <th className="p-2">پردازنده</th>
              <th className="p-2">کارت گرافیک</th>
              <th className="p-2">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((s) => (
              <tr key={s.id} className="border-t border-slate-300 font-bold text-slate-700">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.cpu}</td>
                <td className="p-2">{s.gpu}</td>
                <td className="p-2">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mode === "users" && (
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">شناسه</th>
              <th className="p-2">نام</th>
              <th className="p-2">شماره تماس</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-300 font-bold text-slate-700">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.fullName}</td>
                <td className="p-2">{u.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mode === "reservations" && (
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">شماره رزرو</th>
              <th className="p-2">کاربر</th>
              <th className="p-2">سرور</th>
              <th className="p-2">بازه زمانی</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.reservationId} className="border-t border-slate-300 font-bold text-slate-700">
                <td className="p-2">#{r.reservationId}</td>
                <td className="p-2">{r.userFullName}</td>
                <td className="p-2">{r.serverName}</td>
                <td className="p-2">{r.startAt} {":"} {r.endAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
