'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from 'lucide-react';
import { toast } from "sonner"
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await authApi.login({ phoneNumber });

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

            toast.success("ورود با موفقیت انجام شد.");
            router.push("/");
        } catch (e) {
            console.log(e);
            toast.error("حساب کاربری با این شماره وجود ندارد.");
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
                    <div className='flex items-center border h-10 border-white w-[300px] rounded-md px-2'>
                        <User className='text-white' />
                        <input type='tel'
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
                    <button
                        type="submit"
                        disabled={loading || phoneNumber.length != 11}
                        onClick={() => handleLogin()}
                        className='bg-white text-[#2148C0] disabled:brightness-75 text-xl shadow-2xl rounded-md h-10 w-full flex items-center justify-center hover:scale-105 duration-300 active:scale-95 disabled:active:scale-100 '>{loading ?
                            <Spinner /> : "ورود"}</button>

                    <Link href='/register' className='text-white text-sm underline underline-offset-4'>
                        حساب ندارید؟ ثبت نام کنید
                    </Link>
                </div>
            </div>
        </div>
    </div>
}
