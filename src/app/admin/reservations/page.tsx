import AdminReservationsWithCredentialsClient from "@/components/hardware/AdminReservationsWithCredentialsClient";

export default function AdminReservationsPage() {
  return (
    <div className="page-shell">
      <div className="content-shell">
        <h1 className="section-title">لیست رزروها</h1>
        <p className="mt-2 text-sm text-slate-600">رزروها به‌صورت لیستی نمایش داده می‌شوند.</p>
        <AdminReservationsWithCredentialsClient />
      </div>
    </div>
  );
}
