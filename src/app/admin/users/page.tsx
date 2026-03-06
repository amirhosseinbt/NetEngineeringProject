import AdminTablesClient from "@/components/hardware/AdminTablesClient";

export default function AdminUsersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-section-title">کاربران</h1>
        <p className="admin-subtitle">نمایش کاربران ثبت نام شده اسلات باکس.</p>
      </div>
      <AdminTablesClient mode="users" />
    </div>
  );
}
