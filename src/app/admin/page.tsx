import AdminReservationsWithCredentialsClient from "@/components/hardware/AdminReservationsWithCredentialsClient";

export default function AdminPage() {
  return (
    <div>
      <h1 className="admin-section-title">لیست سفارش‌ها</h1>
      <p className="admin-subtitle">تمام رزروها و ثبت اطلاعات ورود در همین صفحه قابل مدیریت است.</p>
      <AdminReservationsWithCredentialsClient />
    </div>
  );
}
