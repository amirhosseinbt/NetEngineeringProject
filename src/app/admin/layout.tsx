"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-shell-new">
      <header className="admin-header-new">
        <p className="admin-header-title-new">پنل مدیریت اسلات باکس</p>
        <AdminNav />
      </header>
      <main className="admin-main-new">
        <div key={pathname} className="admin-main-content">
          {children}
        </div>
      </main>
    </div>
  );
}
