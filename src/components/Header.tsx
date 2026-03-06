'use client'
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/authApi";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
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
  }
    return <div className='w-full bg-gradient-to-l from-[#1d3ca1] to-[#244BC5] shadow-2xl px-5 py-3'>
        <div className='w-full flex items-center justify-center h-full relative'><p
            className='text-white cursor-pointer font-bold text-2xl tracking-tight hover:opacity-90 duration-300' onClick={()=>router.push('/')}>اسلات باکس</p>
            <button
                onClick={()=>handleLogout()}
                className='text-2xl cursor-pointer absolute left-0 icon-btn'><LogOut className='hover:scale-105 active:scale-95 duration-300'/></button>
        </div>
    </div>
}
