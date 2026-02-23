import AdminTablesClient from "@/components/hardware/AdminTablesClient";

export default function AdminUsersPage() {
  return (
    <div className="page-shell">
      <div className="content-shell">
        <h1 className="section-title">لیست کاربران</h1>
        <p className="mt-2 text-sm text-slate-600">نمایش کاربران ثبت نام شده سامانه.</p>
        <AdminTablesClient mode="users" />
      </div>
    </div>
  );
}
