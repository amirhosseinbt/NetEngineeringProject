'use client'

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
    <div className='w-full p-6'>
      <div className='mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl'>
        <h1 className='text-2xl font-bold text-[#244BC5]'>ویرایش حساب کاربری</h1>
        <p className='mt-2 text-sm text-slate-600'>
          اطلاعات هویتی و شماره تماس خود را به‌روزرسانی کنید.
        </p>

        <div className='mt-5 rounded-xl bg-[#D9D9D9] p-4 shadow-xl'>
          <div className='grid gap-3'>
            <div className='flex items-center border h-11 border-slate-300 bg-white rounded-md px-2'>
              <UserRound className='text-[#244BC5]' size={18} />
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='نام'
                className='w-full text-slate-700 px-2 py-1 outline-none bg-transparent placeholder:text-slate-400'
              />
            </div>

            <div className='flex items-center border h-11 border-slate-300 bg-white rounded-md px-2'>
              <UserRound className='text-[#244BC5]' size={18} />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='نام خانوادگی'
                className='w-full text-slate-700 px-2 py-1 outline-none bg-transparent placeholder:text-slate-400'
              />
            </div>

            <div className='flex items-center border h-11 border-slate-300 bg-white rounded-md px-2'>
              <Phone className='text-[#244BC5]' size={18} />
              <input
                type='tel'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern='[0-9]*'
                inputMode='numeric'
                placeholder='شماره تلفن'
                className='w-full text-slate-700 px-2 py-1 outline-none bg-transparent placeholder:text-slate-400'
              />
            </div>

            <div className='mt-2 flex gap-2'>
              <button
                type='button'
                disabled={!canSubmit || loading || loadingProfile}
                onClick={handleSave}
                className='bg-[#244BC5] text-white disabled:brightness-75 text-sm font-bold rounded-md h-10 px-4 flex items-center justify-center'
              >
                {loading || loadingProfile ? <Spinner /> : "ذخیره تغییرات"}
              </button>

              <Link
                href='/'
                className='rounded-md bg-white border border-slate-300 px-4 h-10 text-sm font-bold text-slate-700 flex items-center justify-center'
              >
                بازگشت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
