import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <p className="admin-header-title">پنل مدیریت سامانه</p>
      </header>
      <div className="admin-grid">
        <AdminSidebar />
        <main className="admin-main-card">{children}</main>
      </div>
    </div>
  );
}
