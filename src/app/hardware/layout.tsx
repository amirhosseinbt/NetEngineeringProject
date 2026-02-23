import type { ReactNode } from "react";
import UserShell from "@/components/user/UserShell";

export default function HardwareLayout({ children }: { children: ReactNode }) {
  return <UserShell>{children}</UserShell>;
}
