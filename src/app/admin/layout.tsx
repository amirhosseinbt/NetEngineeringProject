import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-grid">
        <main className="admin-main-card">{children}</main>
        <AdminSidebar />
      </div>
    </div>
  );
}
