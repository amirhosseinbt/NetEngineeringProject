'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/utils/Spinner";
import { AUTH_USE_MOCKS, authApi } from "@/services/authApi";
import { hashPassword } from "@/lib/authCrypto";
import { getBackendErrorMessage } from "@/lib/apiError";
import AuthInput from "@/components/auth/AuthInput";

const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 11;

/** Normalize for API: 9xxxxxxxxx -> 09xxxxxxxxx */
function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH);
  if (digits.length === 10 && digits.startsWith("9")) return "0" + digits;
  return digits;
}

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const phoneValid = phoneNumber.length >= PHONE_MIN_LENGTH && phoneNumber.length <= PHONE_MAX_LENGTH;
  const canSubmit = phoneValid && password.length > 0;

  const handleLogin = async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      const hashed = await hashPassword(password);
      const normalizedPhone = normalizePhone(phoneNumber);
      const result = await authApi.login({ phoneNumber: normalizedPhone, password: hashed, role });

      const expirationDays = parseInt(process.env.NEXT_PUBLIC_EXPIRE_TOKEN ?? "1", 10);
      const expirationDate = new Date(
        Date.now() + expirationDays * 24 * 60 * 60 * 1000
      ).toISOString();

      localStorage.setItem("token", result.token);
      localStorage.setItem("token_expiration", expirationDate);
      localStorage.setItem("user_role", result.role);
      if (result.refreshToken) {
        localStorage.setItem("refresh_token", result.refreshToken);
      }

      toast.success("ورود با موفقیت انجام شد.");
      router.push(result.role === "admin" ? "/admin" : "/");
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

          <p className="auth-form-title">ورود به اسلات باکس</p>

          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`segmented-btn flex-1 ${role === "user" ? "segmented-btn-active" : ""}`}
            >
              ورود کاربر
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`segmented-btn flex-1 ${role === "admin" ? "segmented-btn-active" : ""}`}
            >
              ورود ادمین
            </button>
          </div>

          <div className="auth-form-fields">
            <AuthInput
              id="login-phone"
              label="شماره تلفن"
              icon={<User />}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH))}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              aria-label="شماره تلفن"
            />

            <AuthInput
              id="login-password"
              label="رمز عبور"
              icon={<Lock />}
              type="password"
              autoComplete={role === "admin" ? "off" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSubmit) {
                  e.preventDefault();
                  handleLogin();
                }
              }}
              placeholder="••••••••"
              aria-label="رمز عبور"
            />

            {AUTH_USE_MOCKS && role === "admin" && (
              <p className="text-white/90 text-xs w-full">
                شماره تست ادمین در حالت mock: <span className="font-bold">09990000000</span>
              </p>
            )}

            <button
              type="button"
              disabled={loading || !canSubmit}
              onClick={handleLogin}
              className="primary-btn h-11 w-full text-base disabled:brightness-75 mt-1"
            >
              {loading ? <Spinner /> : "ورود"}
            </button>

            {role === "user" && (
              <Link
                href="/register"
                className="text-white/95 text-sm underline underline-offset-4 text-center w-full hover:text-white"
              >
                حساب ندارید؟ ثبت نام کنید
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
