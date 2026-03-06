'use client'

import { useEffect, useMemo, useState } from "react";
import { UserRound, Phone, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";
import { getBackendErrorMessage } from "@/lib/apiError";

const MIN_PASSWORD_LENGTH = 6;

/** Simple email format: local@domain (at least one . in domain). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value: string): boolean {
  if (!value.trim()) return true;
  return EMAIL_REGEX.test(value.trim());
}

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

  const emailError = useMemo(() => {
    if (!email.trim()) return null;
    return isValidEmail(email) ? null : "فرمت ایمیل معتبر نیست";
  }, [email]);

  const canSubmit = useMemo(() => {
    return (
      firstName.trim().length > 1 &&
      lastName.trim().length > 1 &&
      (emailError === null)
    );
  }, [firstName, lastName, emailError]);

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
    <div className='page-shell' dir='rtl'>
      <div className='content-shell max-w-4xl'>
        <header className='mb-8'>
          <h1 className='section-title'>ویرایش حساب کاربری</h1>
          <p className='mt-2 text-slate-600 text-[15px] leading-relaxed'>
            اطلاعات هویتی و ایمیل خود را به‌روزرسانی کنید. شماره تلفن قابل تغییر نیست.
          </p>
        </header>

        <section className='profile-section'>
          <div className='profile-form-grid'>
            <label className='profile-field' htmlFor='profile-first-name'>
              <span className='profile-field-label'>نام</span>
              <div className='profile-input-wrap'>
                <UserRound className='profile-field-icon' size={18} />
                <input
                  id='profile-first-name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='نام'
                  className='profile-input'
                  disabled={loadingProfile}
                />
              </div>
            </label>

            <label className='profile-field' htmlFor='profile-last-name'>
              <span className='profile-field-label'>نام خانوادگی</span>
              <div className='profile-input-wrap'>
                <UserRound className='profile-field-icon' size={18} />
                <input
                  id='profile-last-name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='نام خانوادگی'
                  className='profile-input'
                  disabled={loadingProfile}
                />
              </div>
            </label>

            <div className='profile-field'>
              <span className='profile-field-label'>شماره تلفن</span>
              <div className='profile-input-wrap profile-input-readonly'>
                <Phone className='profile-field-icon' size={18} />
                <input
                  id='profile-phone'
                  type='tel'
                  value={phoneNumber}
                  readOnly
                  aria-readonly={true}
                  tabIndex={-1}
                  dir='ltr'
                  className='profile-input text-right'
                />
              </div>
              <span className='profile-field-hint'>قابل تغییر نیست</span>
            </div>

            <div className='profile-field'>
              <label className='profile-field-label' htmlFor='profile-email'>
                ایمیل (اختیاری)
              </label>
              <div
                className={`profile-input-wrap ${emailError ? "profile-input-wrap-error" : ""}`}
              >
                <Mail className='profile-field-icon' size={18} />
                <input
                  id='profile-email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@domain.com'
                  dir='ltr'
                  className='profile-input text-right'
                  disabled={loadingProfile}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "profile-email-error" : undefined}
                />
              </div>
              {emailError && (
                <p id='profile-email-error' className='profile-field-error' role='alert'>
                  {emailError}
                </p>
              )}
            </div>
          </div>

          <button
            type='button'
            disabled={!canSubmit || loading || loadingProfile}
            onClick={handleSave}
            className='profile-submit-btn'
          >
            {loading || loadingProfile ? <Spinner /> : "ذخیره تغییرات"}
          </button>
        </section>

        <section className='profile-section mt-10'>
          <h2 className='profile-section-title'>تغییر رمز عبور</h2>
          <p className='profile-section-desc'>
            رمز عبور فعلی و رمز عبور جدید را وارد کنید (حداقل {MIN_PASSWORD_LENGTH} کاراکتر).
          </p>
          <div className='profile-password-grid'>
            <label className='profile-field' htmlFor='profile-current-password'>
              <span className='profile-field-label'>رمز عبور فعلی</span>
              <div className='profile-input-wrap'>
                <Lock className='profile-field-icon' size={18} />
                <input
                  id='profile-current-password'
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder='••••••••'
                  className='profile-input'
                />
              </div>
            </label>
            <label className='profile-field' htmlFor='profile-new-password'>
              <span className='profile-field-label'>رمز عبور جدید</span>
              <div className='profile-input-wrap'>
                <Lock className='profile-field-icon' size={18} />
                <input
                  id='profile-new-password'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={`حداقل ${MIN_PASSWORD_LENGTH} کاراکتر`}
                  minLength={MIN_PASSWORD_LENGTH}
                  className='profile-input'
                />
              </div>
            </label>
            <label className='profile-field' htmlFor='profile-confirm-password'>
              <span className='profile-field-label'>تکرار رمز عبور جدید</span>
              <div className='profile-input-wrap'>
                <Lock className='profile-field-icon' size={18} />
                <input
                  id='profile-confirm-password'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='••••••••'
                  minLength={MIN_PASSWORD_LENGTH}
                  className='profile-input'
                />
              </div>
            </label>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className='text-red-600 text-sm mt-1' role='alert'>
              رمز عبور و تکرار آن یکسان نیستند.
            </p>
          )}
          <button
            type='button'
            disabled={!canSubmitPassword || loadingPassword}
            onClick={handleChangePassword}
            className='profile-submit-btn profile-submit-btn-secondary'
          >
            {loadingPassword ? <Spinner /> : "تغییر رمز عبور"}
          </button>
        </section>
      </div>
    </div>
  );
}
