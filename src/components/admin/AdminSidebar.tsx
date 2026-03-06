"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, ListOrdered, LogOut, Search, ServerCog, Users } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/authApi";

const items = [
  { href: "/admin", label: "داشبورد", icon: LayoutGrid },
  { href: "/admin/reservations", label: "سفارش ها", icon: ListOrdered },
  { href: "/admin/servers", label: "تعریف سرور", icon: ServerCog },
  { href: "/admin/users", label: "کاربران", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Still clear local state and redirect
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiration");
    localStorage.removeItem("user_role");
    toast.success("خروج از پنل ادمین با موفقیت انجام شد.");
    router.push("/login");
  };

  return (
    <aside className="admin-side-card">
      <div className="admin-search-box">
        <Search size={16} className="text-slate-400" />
        <input className="admin-search-input" placeholder="جستجو" />
      </div>

      <nav className="mt-10 grid gap-3">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`admin-side-link ${active ? "admin-side-link-active" : ""}`}>
              <span>{item.label}</span>
              <Icon size={17} />
            </Link>
          );
        })}
      </nav>

      <button type="button" onClick={handleLogout} className="admin-side-logout mt-auto">
        <span>خروج</span>
        <LogOut size={17} />
      </button>
    </aside>
  );
}
