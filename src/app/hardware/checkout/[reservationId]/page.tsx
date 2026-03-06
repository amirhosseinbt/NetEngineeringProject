import CheckoutClient from "@/components/hardware/CheckoutClient";
import type { RentalUnit } from "@/types/hardware";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ reservationId: string }>;
  searchParams: Promise<{ unit?: RentalUnit; startAt?: string; endAt?: string }>;
}) {
  const { reservationId } = await params;
  const query = await searchParams;

  return (
    <CheckoutClient
      serverId={reservationId}
      unit={query.unit || "HOURLY"}
      startAt={query.startAt || ""}
      endAt={query.endAt || ""}
    />
  );
}
