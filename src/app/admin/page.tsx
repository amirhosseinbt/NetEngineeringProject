import Link from "next/link";
import { ChevronLeft, KeySquare, ServerCog, ShoppingBag, Users } from "lucide-react";
import HomeStats from "@/components/home/HomeStats";

const links = [
  {
    href: "/admin/servers",
    label: "مدیریت سرورها",
    description: "ثبت، ویرایش و حذف سرورهای قابل اجاره",
    icon: ServerCog,
  },
  {
    href: "/admin/users",
    label: "لیست کاربران",
    description: "بررسی کاربران ثبت‌نام‌شده و اطلاعات حساب",
    icon: Users,
  },
  {
    href: "/admin/reservations",
    label: "لیست رزروها",
    description: "نمایش سفارش‌ها، زمان رزرو و وضعیت سرویس",
    icon: ShoppingBag,
  },
  {
    href: "/admin/credentials",
    label: "تخصیص اطلاعات ورود",
    description: "تنظیم IP، نام کاربری و رمز عبور هر سرویس",
    icon: KeySquare,
  },
];

export default function AdminPage() {
  return (
    <div className="page-shell">
      <HomeStats />
      <div className="content-shell">
        <div className="mb-5">
          <h1 className="section-title">مرکز کنترل مدیریت</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">ماژول موردنظر را انتخاب کنید و عملیات مدیریتی را انجام دهید.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="group action-tile">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="rounded-lg bg-[#edf2ff] p-2 text-[#244BC5]">
                  <item.icon size={20} />
                </span>
                <ChevronLeft size={18} className="text-slate-400 transition group-hover:translate-x-[-3px] group-hover:text-[#244BC5]" />
              </div>
              <p className="relative z-10 mt-4 text-base font-extrabold text-[#213374]">{item.label}</p>
              <p className="relative z-10 mt-1 text-xs font-bold text-slate-500">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
