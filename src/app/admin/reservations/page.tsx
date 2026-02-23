import AdminReservationsWithCredentialsClient from "@/components/hardware/AdminReservationsWithCredentialsClient";

export default function AdminReservationsPage() {
  return (
    <div>
      <h1 className="admin-section-title">سفارش ها</h1>
      <p className="admin-subtitle">همه رزروها به صورت یکپارچه نمایش داده می‌شوند.</p>
      <AdminReservationsWithCredentialsClient />
    </div>
  );
}
