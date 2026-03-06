import AdminReservationsWithCredentialsClient from "@/components/hardware/AdminReservationsWithCredentialsClient";

export default function AdminReservationsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-section-title">سفارش‌ها</h1>
        <p className="admin-subtitle">همه رزروها به صورت یکپارچه نمایش داده می‌شوند.</p>
      </div>
      <AdminReservationsWithCredentialsClient />
    </div>
  );
}
