"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Cpu, LayoutGrid, LogOut, Menu, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/authApi";

const links = [
  { href: "/", label: "داشبورد", icon: LayoutGrid },
  { href: "/profile/edit", label: "حساب کاربری", icon: UserCircle2 },
  { href: "/hardware", label: "رزرو سخت‌افزار", icon: Cpu },
];

export default function UserNav() {
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
    toast.success("خروج شما با موفقیت انجام شد.");
    router.push("/login");
  };

  return (
    <nav className="user-nav-bar" aria-label="منوی اصلی" dir="rtl">
      <div className="user-nav-inner">
        {/* Desktop: horizontal links (RTL: first item right) */}
        <div className="user-nav-links">
          {links.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`user-nav-link ${active ? "user-nav-link-active" : ""}`}
              >
                <span>{item.label}</span>
                <Icon size={18} className="user-nav-link-icon" aria-hidden />
              </Link>
            );
          })}
        </div>

        {/* Desktop: logout */}
        <div className="user-nav-actions">
          <button
            type="button"
            onClick={handleLogout}
            className="user-nav-logout"
            aria-label="خروج از حساب"
          >
            <span>خروج</span>
            <LogOut size={18} aria-hidden />
          </button>
        </div>

        {/* Mobile: menu dropdown trigger */}
        <div className="user-nav-mobile" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="user-nav-menu-btn"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="باز کردن منو"
          >
            <Menu size={24} />
          </button>
          {dropdownOpen && (
            <div className="user-nav-dropdown" role="menu">
              {links.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                    className={`user-nav-dropdown-item ${active ? "user-nav-dropdown-item-active" : ""}`}
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
                className="user-nav-dropdown-item user-nav-dropdown-logout"
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
