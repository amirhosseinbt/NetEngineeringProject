"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Cpu, LayoutGrid, LogOut, Search, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/authApi";

const links = [
  { href: "/", label: "داشبورد", icon: LayoutGrid },
  { href: "/hardware", label: "رزرو سخت افزار", icon: Cpu },
  { href: "/profile/edit", label: "حساب کاربری", icon: UserCircle2 },
];

export default function UserSidebar() {
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
    toast.success("خروج شما با موفقیت انجام شد.");
    router.push("/login");
  };

  return (
    <aside className="user-side-card">
      <div className="user-search-box">
        <Search size={16} className="text-slate-400" />
        <input className="user-search-input" placeholder="جستجو" />
      </div>

      <nav className="mt-10 grid gap-3">
        {links.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`user-side-link ${active ? "user-side-link-active" : ""}`}>
              <span>{item.label}</span>
              <Icon size={17} />
            </Link>
          );
        })}
      </nav>

      <button type="button" onClick={handleLogout} className="user-side-logout mt-auto">
        <span>خروج</span>
        <LogOut size={17} />
      </button>
    </aside>
  );
}
