'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRound, Phone } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit =
    firstName.trim().length > 1 &&
    lastName.trim().length > 1 &&
    phoneNumber.length === 11;

  const handleRegister = async () => {
    try {
      setLoading(true);
      await authApi.register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber,
      });

      toast.success("ثبت نام با موفقیت انجام شد. حالا وارد شوید.");
      router.push("/login");
    } catch (e: unknown) {
      console.log(e);

      if (e instanceof Error && e.message === "PHONE_EXISTS") {
        toast.error("این شماره قبلا ثبت نام شده است.");
      } else {
        toast.error("ثبت نام انجام نشد. دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='w-full h-screen relative bg-[#2148C0]'
      style={{
        backgroundImage: `url('/images/BG.webp')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className='size-full flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-8'>
          <Image src='/images/icon.svg' alt='logo' width={120} height={120} />

          <div className='flex items-center flex-col justify-center gap-4 w-[320px]'>
            <div className='flex items-center border h-10 border-white w-full rounded-md px-2'>
              <UserRound className='text-white' size={18} />
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='نام'
                className='w-full text-white px-2 py-1 outline-none bg-transparent placeholder:text-slate-200'
              />
            </div>

            <div className='flex items-center border h-10 border-white w-full rounded-md px-2'>
              <UserRound className='text-white' size={18} />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='نام خانوادگی'
                className='w-full text-white px-2 py-1 outline-none bg-transparent placeholder:text-slate-200'
              />
            </div>

            <div className='flex items-center border h-10 border-white w-full rounded-md px-2'>
              <Phone className='text-white' size={18} />
              <input
                type='tel'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && canSubmit) {
                    event.preventDefault();
                    handleRegister();
                  }
                }}
                pattern='[0-9]*'
                inputMode='numeric'
                placeholder='شماره تلفن'
                className='w-full text-white px-2 py-1 outline-none bg-transparent placeholder:text-slate-200'
              />
            </div>

            <button
              type='button'
              disabled={!canSubmit || loading}
              onClick={handleRegister}
              className='bg-white text-[#2148C0] disabled:brightness-75 text-xl shadow-2xl rounded-md h-10 w-full flex items-center justify-center hover:scale-105 duration-300 active:scale-95 disabled:active:scale-100'
            >
              {loading ? <Spinner /> : "ثبت نام"}
            </button>

            <Link href='/login' className='text-white text-sm underline underline-offset-4'>
              قبلا ثبت نام کرده اید؟ ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
