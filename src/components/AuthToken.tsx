'use client'
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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

export default function AuthToken({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

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

    const expiration = localStorage.getItem("token_expiration");
    if (token && expiration && new Date() > new Date(expiration)) {
      (async () => {
        try {
          const { token: newToken } = await authApi.refreshToken();
          const expirationDate = new Date(
            Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000
          ).toISOString();
          localStorage.setItem("token", newToken);
          localStorage.setItem("token_expiration", expirationDate);
        } catch {
          clearAuthStorage();
          router.push("/login");
        }
      })();
    }
  }, [pathname, router]);

  return children;
}
