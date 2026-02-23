"use client";

import { useEffect, useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";
import type { PurchasedService } from "@/types/hardware";

function formatDate(value: string): string {
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

export default function UserDashboardReservations() {
  const [items, setItems] = useState<PurchasedService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await hardwareApi.getMyServices();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div>
      <h1 className="admin-section-title">سیستم های رزرو شده من</h1>
      <p className="admin-subtitle">در این بخش فقط رزروهای ثبت‌شده شما نمایش داده می‌شود.</p>

      {loading ? (
        <div className="muted-panel mt-5 text-sm font-bold text-slate-700">در حال بارگذاری رزروها...</div>
      ) : items.length === 0 ? (
        <div className="muted-panel mt-5 text-sm font-bold text-slate-700">هنوز رزروی ثبت نشده است.</div>
      ) : (
        <div className="admin-table-shell">
          <table className="admin-table">
            <thead>
              <tr>
                <th>شماره رزرو</th>
                <th>سیستم</th>
                <th>بازه زمانی</th>
                <th>هزینه</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.reservationId}>
                  <td>#{item.reservationId}</td>
                  <td>{item.serverName}</td>
                  <td>
                    {formatDate(item.startAt)} تا {formatDate(item.endAt)}
                  </td>
                  <td>{item.totalAmount.toLocaleString("fa-IR")} تومان</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
