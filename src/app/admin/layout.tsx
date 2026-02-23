import type { ReactNode } from "react";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white">
      <AdminTopBar />
      {children}
    </div>
  );
}
