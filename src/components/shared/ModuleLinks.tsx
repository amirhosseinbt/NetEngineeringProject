import Link from "next/link";

const links = [
  { href: "/hardware", label: "رزرو سخت افزار" },
  { href: "/my-services", label: "سرویس های من" },
  { href: "/profile/edit", label: "ویرایش حساب کاربری" },
];

export default function ModuleLinks() {
  return (
    <div className="w-full px-5 pb-8 pt-2">
      <div className="rounded-xl bg-[#D9D9D9] p-4 shadow-xl">
        <p className="mb-3 text-sm font-bold text-slate-700">ماژول های جدید</p>
        <div className="flex flex-wrap gap-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md bg-[#244BC5] px-3 py-2 text-sm font-bold text-white hover:brightness-95"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
