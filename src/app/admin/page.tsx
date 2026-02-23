import Link from "next/link";

const links = [
  { href: "/admin/servers", label: "مدیریت سرورها" },
  { href: "/admin/users", label: "لیست کاربران" },
  { href: "/admin/reservations", label: "لیست رزروها" },
  { href: "/admin/credentials", label: "تخصیص اطلاعات ورود" },
];

export default function AdminPage() {
  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#244BC5]">پنل مدیریت</h1>
        <p className="mt-2 text-sm text-slate-600">بخش مورد نظر را انتخاب کنید.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md bg-[#244BC5] px-3 py-2 text-sm font-bold text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
