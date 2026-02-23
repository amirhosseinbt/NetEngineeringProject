import type { ReactNode } from "react";
import UserSidebar from "@/components/user/UserSidebar";

export default function UserShell({
  children,
  title = "پنل کاربری سامانه",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="user-shell">
      <header className="user-header">
        <p className="user-header-title">{title}</p>
      </header>
      <div className="user-grid">
        <UserSidebar />
        <main className="user-main-card">{children}</main>
      </div>
    </div>
  );
}
