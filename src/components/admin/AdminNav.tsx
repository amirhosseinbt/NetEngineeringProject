"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { LayoutGrid, ListOrdered, LogOut, Menu, ServerCog, Users } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/authApi";

const links = [
  { href: "/admin", label: "داشبورد", icon: LayoutGrid },
  { href: "/admin/reservations", label: "سفارش‌ها", icon: ListOrdered },
  { href: "/admin/servers", label: "سرورها", icon: ServerCog },
  { href: "/admin/users", label: "کاربران", icon: Users },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
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
    <nav className="admin-nav-bar" aria-label="منوی مدیریت" dir="rtl">
      <div className="admin-nav-inner">
        <div className="admin-nav-links">
          {links.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${active ? "admin-nav-link-active" : ""}`}
              >
                <span>{item.label}</span>
                <Icon size={18} className="admin-nav-link-icon" aria-hidden />
              </Link>
            );
          })}
        </div>

        <div className="admin-nav-actions">
          <button
            type="button"
            onClick={handleLogout}
            className="admin-nav-logout"
            aria-label="خروج از حساب"
          >
            <span>خروج</span>
            <LogOut size={18} aria-hidden />
          </button>
        </div>

        <div className="admin-nav-mobile" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="admin-nav-menu-btn"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="باز کردن منو"
          >
            <Menu size={24} />
          </button>
          {dropdownOpen && (
            <div className="admin-nav-dropdown" role="menu">
              {links.map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                    className={`admin-nav-dropdown-item ${active ? "admin-nav-dropdown-item-active" : ""}`}
                  >
                    <span>{item.label}</span>
                    <Icon size={18} aria-hidden />
                  </Link>
                );
              })}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="admin-nav-dropdown-item admin-nav-dropdown-logout"
              >
                <span>خروج</span>
                <LogOut size={18} aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
