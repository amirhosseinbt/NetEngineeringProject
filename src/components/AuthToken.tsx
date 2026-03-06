'use client'

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setRefreshTokenFn } from "@/services/http";
import { authApi } from "@/services/authApi";

const publicRoutes = new Set(["/login", "/register"]);
const EXPIRATION_DAYS = typeof process.env.NEXT_PUBLIC_EXPIRE_TOKEN !== "undefined"
  ? parseInt(process.env.NEXT_PUBLIC_EXPIRE_TOKEN, 10) || 1
  : 1;

function clearAuthStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("token_expiration");
  localStorage.removeItem("user_role");
  localStorage.removeItem("refresh_token");
}

function isTokenExpired(): boolean {
  if (typeof window === "undefined") return false;
  const expiration = localStorage.getItem("token_expiration");
  if (!expiration) return false;
  return new Date() > new Date(expiration);
}

export default function AuthToken({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [refreshing, setRefreshing] = useState(false);
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    setRefreshTokenFn(async () => {
      try {
        const { token } = await authApi.refreshToken();
        if (token && typeof window !== "undefined") {
          const expirationDate = new Date(
            Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000
          ).toISOString();
          localStorage.setItem("token_expiration", expirationDate);
          return token;
        }
      } catch {
        clearAuthStorage();
        routerRef.current.push("/login");
        return null;
      }
      return null;
    });
    return () => setRefreshTokenFn(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("user_role") === "admin" ? "admin" : "user";
    const isPublicRoute = publicRoutes.has(pathname);
    const isAdminRoute = pathname.startsWith("/admin");

    if (!token && !isPublicRoute) {
      router.push("/login");
      return;
    }

    if (token && isPublicRoute) {
      router.push(role === "admin" ? "/admin" : "/");
      return;
    }

    if (token && isAdminRoute && role !== "admin") {
      router.push("/");
      return;
    }

    if (token && !isPublicRoute && !isAdminRoute && role === "admin") {
      router.push("/admin");
      return;
    }

    if (token && !isPublicRoute && isTokenExpired()) {
      setRefreshing(true);
      authApi
        .refreshToken()
        .then(({ token: newToken }) => {
          const expirationDate = new Date(
            Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000
          ).toISOString();
          localStorage.setItem("token", newToken);
          localStorage.setItem("token_expiration", expirationDate);
        })
        .catch(() => {
          clearAuthStorage();
          router.push("/login");
        })
        .finally(() => setRefreshing(false));
    }
  }, [pathname, router]);

  if (refreshing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center" dir="rtl">
        <p className="text-slate-600 font-bold">در حال به‌روزرسانی نشست...</p>
      </div>
    );
  }

  return children;
}
