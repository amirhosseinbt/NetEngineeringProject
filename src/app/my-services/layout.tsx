import type { ReactNode } from "react";
import Header from "@/components/Header";

export default function MyServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      {children}
    </div>
  );
}
