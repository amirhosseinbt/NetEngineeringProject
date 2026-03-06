import AdminServersCrudClient from "@/components/hardware/AdminServersCrudClient";

export default function AdminServersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-section-title">تعریف سرورها</h1>
        <p className="admin-subtitle">ثبت، ویرایش و حذف سرورهای قابل اجاره.</p>
      </div>
      <AdminServersCrudClient />
    </div>
  );
}
