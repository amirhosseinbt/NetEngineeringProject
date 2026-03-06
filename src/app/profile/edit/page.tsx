'use client'

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { UserRound, Phone } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";
import { getBackendErrorMessage } from "@/lib/apiError";

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
        toast.error(getBackendErrorMessage(e));
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
      toast.error(getBackendErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='page-shell'>
      <div className='content-shell max-w-4xl'>
        <h1 className='section-title'>ویرایش حساب کاربری</h1>
        <p className='mt-2 text-sm text-slate-600'>
          اطلاعات هویتی و شماره تماس خود را به‌روزرسانی کنید.
        </p>

        <div className='mt-5 muted-panel'>
          <div className='grid gap-3'>
            <div className='flex items-center'>
              <UserRound className='text-[#244BC5]' size={18} />
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='نام'
                className='input-shell mr-2'
              />
            </div>

            <div className='flex items-center'>
              <UserRound className='text-[#244BC5]' size={18} />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='نام خانوادگی'
                className='input-shell mr-2'
              />
            </div>

            <div className='flex items-center'>
              <Phone className='text-[#244BC5]' size={18} />
              <input
                type='tel'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern='[0-9]*'
                inputMode='numeric'
                placeholder='شماره تلفن'
                className='input-shell mr-2'
              />
            </div>

            <div className='mt-2 flex gap-2'>
              <button type='button' disabled={!canSubmit || loading || loadingProfile} onClick={handleSave} className='primary-btn'>
                {loading || loadingProfile ? <Spinner /> : "ذخیره تغییرات"}
              </button>

              <Link href='/' className='secondary-btn'>
                بازگشت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
