'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRound, Phone, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { authApi } from "@/services/authApi";
import { hashPassword } from "@/lib/authCrypto";
import { getBackendErrorMessage } from "@/lib/apiError";
import AuthInput from "@/components/auth/AuthInput";

const MIN_PASSWORD_LENGTH = 6;
const PHONE_LENGTH = 11;

/** Simple email format check when user enters an email. */
function isValidEmail(value: string): boolean {
  if (!value.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const passwordLongEnough = password.length >= MIN_PASSWORD_LENGTH;
  const emailValid = isValidEmail(email);
  const canSubmit =
    firstName.trim().length > 1 &&
    lastName.trim().length > 1 &&
    phoneNumber.length === PHONE_LENGTH &&
    passwordLongEnough &&
    passwordsMatch &&
    emailValid;

  const handleRegister = async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      const hashed = await hashPassword(password);
      const result = await authApi.register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber,
        email: email.trim() || undefined,
        password: hashed,
      });

      if (result.token) {
        localStorage.setItem("token", result.token);
        if (result.refreshToken) {
          localStorage.setItem("refresh_token", result.refreshToken);
        }
        const expirationDays = parseInt(process.env.NEXT_PUBLIC_EXPIRE_TOKEN ?? "1", 10);
        const expirationDate = new Date(
          Date.now() + expirationDays * 24 * 60 * 60 * 1000
        ).toISOString();
        localStorage.setItem("token_expiration", expirationDate);
        localStorage.setItem("user_role", "user");
        toast.success("ثبت نام با موفقیت انجام شد؛ وارد شدید.");
        router.push("/");
      } else {
        toast.success("ثبت نام با موفقیت انجام شد. حالا وارد شوید.");
        router.push("/login");
      }
    } catch (e: unknown) {
      toast.error(getBackendErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen relative bg-[#2148C0] flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/BG.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-[420px] flex justify-center" dir="rtl">
        <div className="auth-form-card">
          <Image src="/images/icon.svg" alt="لوگو" width={100} height={100} priority />

          <p className="auth-form-title">ثبت نام کاربر</p>

          <div className="auth-form-fields">
            <AuthInput
              id="register-first-name"
              label="نام"
              required
              icon={<UserRound />}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="نام"
              aria-label="نام"
            />

            <AuthInput
              id="register-last-name"
              label="نام خانوادگی"
              required
              icon={<UserRound />}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="نام خانوادگی"
              aria-label="نام خانوادگی"
            />

            <AuthInput
              id="register-phone"
              label="شماره تلفن"
              required
              icon={<Phone />}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              aria-label="شماره تلفن"
            />

            <AuthInput
              id="register-email"
              label="ایمیل (اختیاری)"
              icon={<Mail />}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              dir="ltr"
              error={email.trim() && !emailValid ? "فرمت ایمیل معتبر نیست." : undefined}
              aria-label="ایمیل"
            />

            <AuthInput
              id="register-password"
              label={`رمز عبور (حداقل ${MIN_PASSWORD_LENGTH} کاراکتر)`}
              required
              icon={<Lock />}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              aria-label="رمز عبور"
            />

            <AuthInput
              id="register-confirm-password"
              label="تکرار رمز عبور"
              required
              icon={<Lock />}
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSubmit) {
                  e.preventDefault();
                  handleRegister();
                }
              }}
              placeholder="••••••••"
              error={confirmPassword && !passwordsMatch ? "رمز عبور و تکرار آن یکسان نیستند." : undefined}
              aria-label="تکرار رمز عبور"
            />

            {password.length > 0 && !passwordLongEnough && (
              <p className="text-red-300 text-sm">رمز عبور حداقل {MIN_PASSWORD_LENGTH} کاراکتر باشد.</p>
            )}

            <button
              type="button"
              disabled={!canSubmit || loading}
              onClick={handleRegister}
              className="primary-btn h-11 w-full text-base disabled:brightness-75 mt-1"
            >
              {loading ? <Spinner /> : "ثبت نام"}
            </button>

            <Link
              href="/login"
              className="text-white/95 text-sm underline underline-offset-4 text-center w-full hover:text-white"
            >
              قبلا ثبت نام کرده اید؟ ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
