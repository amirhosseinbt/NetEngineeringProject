import Link from "next/link";
import HomeStats from "@/components/home/HomeStats";

const links = [
  { href: "/admin/servers", label: "مدیریت سرورها" },
  { href: "/admin/users", label: "لیست کاربران" },
  { href: "/admin/reservations", label: "لیست رزروها" },
  { href: "/admin/credentials", label: "تخصیص اطلاعات ورود" },
];

export default function AdminPage() {
  return (
    <div className="page-shell">
      <HomeStats />
      <div className="content-shell max-w-4xl">
        <h1 className="section-title">پنل مدیریت</h1>
        <p className="mt-2 text-sm text-slate-600">بخش مورد نظر را انتخاب کنید.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="primary-btn">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
