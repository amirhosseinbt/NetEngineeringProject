"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import UserNav from "@/components/user/UserNav";

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
        <UserNav />
      </header>
      <main className="user-main-card user-main-full">
        <div key={pathname} className="user-main-content">
          {children}
        </div>
      </main>
    </div>
  );
}
