"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import UserSidebar from "@/components/user/UserSidebar";

export default function UserShell({
  children,
  title = "پنل کاربری اسلات باکس",
}: {
  children: ReactNode;
  title?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="user-shell">
      <header className="user-header">
        <p className="user-header-title">{title}</p>
      </header>
      <div className="user-grid">
        <UserSidebar />
        <main className="user-main-card">
          <div key={pathname} className="user-main-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
