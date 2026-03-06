import UserDashboardReservations from "@/components/user/UserDashboardReservations";
import UserShell from "@/components/user/UserShell";

export default function Home() {
  return (
    <UserShell>
      <UserDashboardReservations />
    </UserShell>
  );
}
