'use client'

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { UserRound, Phone, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";
import { getBackendErrorMessage } from "@/lib/apiError";

const MIN_PASSWORD_LENGTH = 6;

export default function EditProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoadingProfile(true);
        const data = await authApi.getProfile();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email ?? "");
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

  const canSubmitPassword =
    currentPassword.length > 0 &&
    newPassword.length >= MIN_PASSWORD_LENGTH &&
    newPassword === confirmPassword;

  const handleSave = async () => {
    try {
      setLoading(true);
      await authApi.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber,
        email: email.trim() || undefined,
      });

      toast.success("اطلاعات حساب کاربری با موفقیت ذخیره شد.");
    } catch (e: unknown) {
      toast.error(getBackendErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!canSubmitPassword) return;
    try {
      setLoadingPassword(true);
      await authApi.updatePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("رمز عبور با موفقیت تغییر کرد.");
    } catch (e: unknown) {
      toast.error(getBackendErrorMessage(e));
    } finally {
      setLoadingPassword(false);
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
              <UserRound className='text-[#244BC5] shrink-0' size={18} />
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='نام'
                className='input-shell mr-2'
              />
            </div>

            <div className='flex items-center'>
              <UserRound className='text-[#244BC5] shrink-0' size={18} />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='نام خانوادگی'
                className='input-shell mr-2'
              />
            </div>

            <div className='flex items-center'>
              <Phone className='text-[#244BC5] shrink-0' size={18} />
              <input
                type='tel'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                pattern='[0-9]*'
                inputMode='numeric'
                placeholder='۰۹۱۲۳۴۵۶۷۸۹'
                dir='ltr'
                className='input-shell mr-2 text-right'
              />
            </div>

            <div className='flex items-center'>
              <Mail className='text-[#244BC5] shrink-0' size={18} />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@domain.com'
                dir='ltr'
                className='input-shell mr-2 text-right'
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

        <h2 className='section-title mt-8'>تغییر رمز عبور</h2>
        <p className='mt-2 text-sm text-slate-600'>
          رمز عبور فعلی و رمز عبور جدید را وارد کنید.
        </p>
        <div className='mt-5 muted-panel'>
          <div className='grid gap-3 max-w-md'>
            <div className='flex items-center'>
              <Lock className='text-[#244BC5] shrink-0' size={18} />
              <input
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='رمز عبور فعلی'
                className='input-shell mr-2'
              />
            </div>
            <div className='flex items-center'>
              <Lock className='text-[#244BC5] shrink-0' size={18} />
              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={`رمز عبور جدید (حداقل ${MIN_PASSWORD_LENGTH} کاراکتر)`}
                minLength={MIN_PASSWORD_LENGTH}
                className='input-shell mr-2'
              />
            </div>
            <div className='flex items-center'>
              <Lock className='text-[#244BC5] shrink-0' size={18} />
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={`تکرار رمز عبور جدید (حداقل ${MIN_PASSWORD_LENGTH} کاراکتر)`}
                minLength={MIN_PASSWORD_LENGTH}
                className='input-shell mr-2'
              />
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className='text-red-600 text-sm'>رمز عبور و تکرار آن یکسان نیستند.</p>
            )}
            <button
              type='button'
              disabled={!canSubmitPassword || loadingPassword}
              onClick={handleChangePassword}
              className='primary-btn w-fit'
            >
              {loadingPassword ? <Spinner /> : "تغییر رمز عبور"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
