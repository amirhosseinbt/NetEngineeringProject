'use client'
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = new Set(["/login", "/register"]);

export default function AuthToken({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("user_role") === "admin" ? "admin" : "user";
    const isPublicRoute = publicRoutes.has(pathname);
    const isAdminRoute = pathname.startsWith("/admin");

    // if (!token && !isPublicRoute) {
    //   router.push("/login");
    //   return;
    // }

    // if (token && isPublicRoute) {
    //   router.push(role === "admin" ? "/admin" : "/");
    //   return;
    // }

    // if (token && isAdminRoute && role !== "admin") {
    //   router.push("/");
    //   return;
    // }

    // if (token && !isPublicRoute && !isAdminRoute && role === "admin") {
    //   router.push("/admin");
    //   return;
    // }

    // const expiration = localStorage.getItem('token_expiration');
    // if (token && expiration && new Date() > new Date(expiration)) {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('token_expiration');
    //   localStorage.removeItem('is_vip');
    //   localStorage.removeItem('user_role');
    //   router.push('/login');
    // }
  }, [pathname, router]);

  return children;
}
