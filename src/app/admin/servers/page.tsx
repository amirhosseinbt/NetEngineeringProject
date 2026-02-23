import AdminServersCrudClient from "@/components/hardware/AdminServersCrudClient";

export default function AdminServersPage() {
  return (
    <div className="page-shell">
      <div className="content-shell">
        <h1 className="section-title">مدیریت سرورها</h1>
        <p className="mt-2 text-sm text-slate-600">
          ایجاد، ویرایش و حذف سرورهای قابل اجاره از همین فرم انجام می‌شود.
        </p>
        <AdminServersCrudClient />
      </div>
    </div>
  );
}
