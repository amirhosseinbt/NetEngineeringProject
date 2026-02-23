'use client'
import {useRouter} from "next/navigation";
//icon
import { LogOut } from 'lucide-react';
import {toast} from "sonner";

export default function Header(){
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
        toast.success('خروج شما با موفقیت انجام شد.')
        window.location.reload();
    }
    return <div className='w-full bg-gradient-to-l from-[#1d3ca1] to-[#244BC5] shadow-2xl px-5 py-3'>
        <div className='w-full flex items-center justify-center h-full relative'><p
            className='text-white cursor-pointer font-bold text-2xl tracking-tight hover:opacity-90 duration-300' onClick={()=>router.push('/')}>سامانه پیساز</p>
            <button
                onClick={()=>handleLogout()}
                className='text-2xl cursor-pointer absolute left-0 icon-btn'><LogOut className='hover:scale-105 active:scale-95 duration-300'/></button>
        </div>
    </div>
}
