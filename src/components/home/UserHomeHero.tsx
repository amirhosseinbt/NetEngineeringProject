"use client";

import Link from "next/link";
import { ChevronLeft, Cpu, Settings, UserCircle2 } from "lucide-react";

const quickLinks = [
  {
    id: "hardware",
    label: "رزرو سخت افزار",
    href: "/hardware",
    description: "انتخاب سیستم و رزرو بازه زمانی",
    icon: Cpu,
  },
  {
    id: "services",
    label: "سرویس های من",
    href: "/my-services",
    description: "پیگیری سفارش‌ها و اطلاعات دسترسی",
    icon: Settings,
  },
  {
    id: "profile",
    label: "ویرایش حساب کاربری",
    href: "/profile/edit",
    description: "به‌روزرسانی اطلاعات هویتی و تماس",
    icon: UserCircle2,
  },
];

export default function UserHomeHero() {
  return (
    <section className="dashboard-hero">
      <div className="relative z-10">
        <div className="mb-5">
          <p className="text-xs font-bold text-[#4b64b8]">پنل کاربری</p>
          <h1 className="mt-1 text-xl font-extrabold text-[#1f2f67] md:text-2xl">داشبورد کاربر</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">
            از این صفحه می‌توانید سرویس‌های خود را مدیریت کنید و سخت‌افزار موردنیازتان را رزرو کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link key={item.id} href={item.href} className="group action-tile">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="rounded-lg bg-[#edf2ff] p-2 text-[#244BC5]">
                  <item.icon size={18} />
                </span>
                <ChevronLeft size={18} className="text-slate-400 transition group-hover:translate-x-[-3px] group-hover:text-[#244BC5]" />
              </div>
              <p className="relative z-10 mt-4 text-base font-extrabold text-[#213374]">{item.label}</p>
              <p className="relative z-10 mt-1 text-xs font-bold text-slate-500">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
