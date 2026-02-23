'use client'

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function AdminTopBar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("خروج از پنل ادمین با موفقیت انجام شد.");
    router.push("/login");
  };

  return (
    <div className="w-full bg-[#244BC5] px-6 py-3 shadow-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <p className="text-lg font-bold text-white">پنل مدیریت</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-[#244BC5]"
        >
          <LogOut size={16} />
          خروج
        </button>
      </div>
    </div>
  );
}
