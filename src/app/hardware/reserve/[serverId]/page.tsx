import ReserveClient from "@/components/hardware/ReserveClient";

export default async function ReservePage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  return <ReserveClient serverId={Number(serverId)} />;
}
