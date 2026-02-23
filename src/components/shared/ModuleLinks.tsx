import Link from "next/link";

const links = [
  { href: "/hardware", label: "رزرو سخت افزار" },
  { href: "/my-services", label: "سرویس های من" },
  { href: "/profile/edit", label: "ویرایش حساب کاربری" },
];

export default function ModuleLinks() {
  return (
    <div className="mt-4">
      <div className="content-shell">
        <p className="mb-3 text-sm font-bold text-slate-700">دسترسی سریع</p>
        <div className="flex flex-wrap gap-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="primary-btn"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
