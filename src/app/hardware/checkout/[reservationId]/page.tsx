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
      serverId={Number(reservationId)}
      unit={query.unit || "HOURLY"}
      startAt={query.startAt || "2026-02-24T10:00:00.000Z"}
      endAt={query.endAt || "2026-02-24T12:00:00.000Z"}
    />
  );
}
