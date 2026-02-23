import AdminTablesClient from "@/components/hardware/AdminTablesClient";

export default function AdminReservationsPage() {
  return (
    <div className="page-shell">
      <div className="content-shell">
        <h1 className="section-title">لیست رزروها</h1>
        <p className="mt-2 text-sm text-slate-600">نمایش رزروهای خریداری شده و بازه های زمانی آن ها.</p>
        <AdminTablesClient mode="reservations" />
      </div>
    </div>
  );
}
