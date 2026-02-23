'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { UserRound, Phone } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";

export default function EditProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoadingProfile(true);
        const data = await authApi.getProfile();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
      } catch (e) {
        console.log(e);
        toast.error("بارگذاری اطلاعات کاربر انجام نشد.");
      } finally {
        setLoadingProfile(false);
      }
    };

    run();
  }, []);

  const canSubmit = useMemo(() => {
    return firstName.trim().length > 1 && lastName.trim().length > 1 && phoneNumber.length === 11;
  }, [firstName, lastName, phoneNumber]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await authApi.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber,
      });

      toast.success("اطلاعات حساب کاربری با موفقیت ذخیره شد.");
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof Error && e.message === "PHONE_EXISTS") {
        toast.error("این شماره تلفن قبلا استفاده شده است.");
      } else {
        toast.error("ذخیره اطلاعات انجام نشد.");
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
            <p className='text-white text-lg font-bold'>ویرایش حساب کاربری</p>

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
                pattern='[0-9]*'
                inputMode='numeric'
                placeholder='شماره تلفن'
                className='w-full text-white px-2 py-1 outline-none bg-transparent placeholder:text-slate-200'
              />
            </div>

            <button
              type='button'
              disabled={!canSubmit || loading || loadingProfile}
              onClick={handleSave}
              className='bg-white text-[#2148C0] disabled:brightness-75 text-xl shadow-2xl rounded-md h-10 w-full flex items-center justify-center hover:scale-105 duration-300 active:scale-95 disabled:active:scale-100'
            >
              {loading || loadingProfile ? <Spinner /> : "ذخیره تغییرات"}
            </button>

            <Link href='/' className='text-white text-sm underline underline-offset-4'>
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
