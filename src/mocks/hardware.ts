import type {
  AdminReservation,
  AdminUser,
  DashboardStats,
  HardwareServer,
  PurchasedService,
  ReservationPreview,
  RentalUnit,
  TimeSlot,
} from "@/types/hardware";

export const mockServers: HardwareServer[] = [
  {
    id: 1,
    name: "Render Node A1",
    cpu: "AMD Ryzen 9 5900X",
    gpu: "NVIDIA RTX 5080",
    ramGb: 64,
    diskGb: 512,
    os: "Windows 11",
    hourlyPrice: 350000,
    dailyPrice: 4200000,
    status: "AVAILABLE",
  },
  {
    id: 2,
    name: "AI Node B2",
    cpu: "Intel i9-14900K",
    gpu: "NVIDIA RTX 4090",
    ramGb: 128,
    diskGb: 1024,
    os: "Ubuntu 22.04",
    hourlyPrice: 500000,
    dailyPrice: 6000000,
    status: "AVAILABLE",
  },
  {
    id: 3,
    name: "Compute Node C3",
    cpu: "AMD Ryzen 7 7800X3D",
    gpu: "NVIDIA RTX 5070",
    ramGb: 32,
    diskGb: 512,
    os: "Windows 11",
    hourlyPrice: 250000,
    dailyPrice: 3000000,
    status: "MAINTENANCE",
  },
];

export const mockMyServices: PurchasedService[] = [
  {
    reservationId: 5001,
    serverName: "Render Node A1",
    startAt: "2026-02-24T08:00:00.000Z",
    endAt: "2026-02-24T20:00:00.000Z",
    totalAmount: 4200000,
    ipAddress: "185.143.223.10",
    username: "user5001",
    password: "A1b2C3d4",
  },
  {
    reservationId: 5002,
    serverName: "AI Node B2",
    startAt: "2026-02-25T08:00:00.000Z",
    endAt: "2026-02-26T08:00:00.000Z",
    totalAmount: 6000000,
    ipAddress: null,
    username: null,
    password: null,
  },
];

export const mockAdminUsers: AdminUser[] = [
  { id: 1, fullName: "Ali Ahmadi", phoneNumber: "09120000001" },
  { id: 2, fullName: "Sara Moradi", phoneNumber: "09120000002" },
];

export const mockAdminReservations: AdminReservation[] = [
  {
    reservationId: 5001,
    userFullName: "Ali Ahmadi",
    serverName: "Render Node A1",
    startAt: "2026-02-24T08:00:00.000Z",
    endAt: "2026-02-24T20:00:00.000Z",
  },
  {
    reservationId: 5002,
    userFullName: "Sara Moradi",
    serverName: "AI Node B2",
    startAt: "2026-02-25T08:00:00.000Z",
    endAt: "2026-02-26T08:00:00.000Z",
  },
];

export const mockStats: DashboardStats = {
  usersCount: 2,
  serversCount: 3,
  purchasesCount: 2,
};

export function getMockTimeSlots(unit: RentalUnit): TimeSlot[] {
  if (unit === "DAILY") {
    return [
      { startAt: "2026-02-24T00:00:00.000Z", endAt: "2026-02-25T00:00:00.000Z", isReserved: true },
      { startAt: "2026-02-25T00:00:00.000Z", endAt: "2026-02-26T00:00:00.000Z", isReserved: false },
      { startAt: "2026-02-26T00:00:00.000Z", endAt: "2026-02-27T00:00:00.000Z", isReserved: false },
    ];
  }

  return [
    { startAt: "2026-02-24T08:00:00.000Z", endAt: "2026-02-24T10:00:00.000Z", isReserved: true },
    { startAt: "2026-02-24T10:00:00.000Z", endAt: "2026-02-24T12:00:00.000Z", isReserved: false },
    { startAt: "2026-02-24T12:00:00.000Z", endAt: "2026-02-24T14:00:00.000Z", isReserved: false },
    { startAt: "2026-02-24T14:00:00.000Z", endAt: "2026-02-24T16:00:00.000Z", isReserved: true },
  ];
}

export function getMockPreview(payload: {
  serverId: number;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
}): ReservationPreview {
  const server = mockServers.find((s) => s.id === payload.serverId) || mockServers[0];
  const price = payload.unit === "HOURLY" ? server.hourlyPrice : server.dailyPrice;

  return {
    serverId: payload.serverId,
    unit: payload.unit,
    startAt: payload.startAt,
    endAt: payload.endAt,
    totalAmount: price,
    currency: "IRR",
  };
}
