'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from 'lucide-react';
import { toast } from "sonner"
import Spinner from "@/utils/Spinner";
import { AUTH_USE_MOCKS, authApi } from "@/services/authApi";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [role, setRole] = useState<"user" | "admin">("user");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await authApi.login({ phoneNumber, role });

            setPhoneNumber("");

            const expirationDays = parseInt(process.env.NEXT_PUBLIC_EXPIRE_TOKEN || '1', 10);
            if (!Number.isInteger(expirationDays)) {
                throw new Error('Invalid token expiration configuration');
            }

            const expirationDate = new Date(
                new Date().getTime() + (expirationDays * 24 * 60 * 60 * 1000)
            ).toISOString();

            localStorage.setItem('token', result.token);
            localStorage.setItem('token_expiration', expirationDate);
            localStorage.setItem('is_vip', result.isVip.toString());
            localStorage.setItem('user_role', result.role);

            toast.success("ورود با موفقیت انجام شد.");
            router.push(result.role === "admin" ? "/admin" : "/");
        } catch (e) {
            console.log(e);
            toast.error(role === "admin" ? "ادمین با این شماره یافت نشد." : "حساب کاربری با این شماره وجود ندارد.");
        } finally {
            setLoading(false);
        }
    }

    return <div className='w-full h-screen relative bg-[#2148C0]' style={{
        backgroundImage: `url('/images/BG.webp')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }}>
        <div className='size-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-10'>
                <Image src='/images/icon.svg' alt='logo' width={120} height={120} />
                <div className='flex items-center flex-col justify-center gap-5'>
                    <div className='flex gap-2 w-[300px]'>
                        <button
                            type='button'
                            onClick={() => setRole("user")}
                            className={`w-full rounded-md px-3 py-2 text-sm font-bold ${role === "user" ? "bg-white text-[#2148C0]" : "bg-white/20 text-white"}`}
                        >
                            ورود کاربر
                        </button>
                        <button
                            type='button'
                            onClick={() => setRole("admin")}
                            className={`w-full rounded-md px-3 py-2 text-sm font-bold ${role === "admin" ? "bg-white text-[#2148C0]" : "bg-white/20 text-white"}`}
                        >
                            ورود ادمین
                        </button>
                    </div>

                    <div className='flex items-center border h-10 border-white w-[300px] rounded-md px-2'>
                        <User className='text-white' />
                        <input type='tel'
                            value={phoneNumber}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && phoneNumber.length == 11) {
                                    event.preventDefault()
                                    handleLogin()
                                }
                            }}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='شماره تلفن'
                            className='w-full text-white px-2 py-1 outline-none bg-transparent placeholder:text-slate-200' />
                    </div>

                    {AUTH_USE_MOCKS && role === "admin" && (
                        <p className='w-[300px] text-xs text-white/90'>
                            شماره تست ادمین در حالت mock: <span className='font-bold'>09990000000</span>
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || phoneNumber.length != 11}
                        onClick={() => handleLogin()}
                        className='bg-white text-[#2148C0] disabled:brightness-75 text-xl shadow-2xl rounded-md h-10 w-[300px] flex items-center justify-center hover:scale-105 duration-300 active:scale-95 disabled:active:scale-100 '>{loading ?
                            <Spinner /> : "ورود"}</button>

                    {role === "user" && (
                        <Link href='/register' className='text-white text-sm underline underline-offset-4'>
                            حساب ندارید؟ ثبت نام کنید
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </div>
}
