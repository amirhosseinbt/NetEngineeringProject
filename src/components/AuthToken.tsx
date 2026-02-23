'use client'
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = new Set(["/login", "/register"]);

export default function AuthToken({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublicRoute = publicRoutes.has(pathname);

    if (!token && !isPublicRoute) {
      router.push("/login");
      return;
    }

    if (token && isPublicRoute) {
      router.push("/");
      return;
    }

    const expiration = localStorage.getItem('token_expiration');
    if (token && expiration && new Date() > new Date(expiration)) {
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiration');
      localStorage.removeItem('is_vip');
      router.push('/login');
    }
  }, [pathname, router]);

  return children;
}
