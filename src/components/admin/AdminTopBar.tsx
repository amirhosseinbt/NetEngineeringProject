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
    <div className='w-full bg-[#244BC5] shadow-2xl px-5 py-3'>
      <div className='w-full flex items-center justify-center h-full relative'>
        <p
          className='text-white cursor-pointer font-bold text-2xl hover:scale-105 duration-300'
          onClick={() => router.push('/admin')}
        >
          پنل مدیریت
        </p>

        <button
          onClick={handleLogout}
          className='text-2xl cursor-pointer text-white absolute left-0'
          aria-label='خروج'
        >
          <LogOut className='hover:scale-105 active:scale-95 duration-300' />
        </button>
      </div>
    </div>
  );
}
