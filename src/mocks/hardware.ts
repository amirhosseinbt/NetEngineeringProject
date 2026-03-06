import type {
  AdminReservation,
  AdminUser,
  CalendarDayAvailability,
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
    ownerPhone: "09120000001",
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
    ownerPhone: "09120000002",
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

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

function monthLength(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function seeded(serverId: number, year: number, month: number, day: number): number {
  return (serverId * 17 + year * 3 + month * 11 + day * 7) % 10;
}

function toNumericId(serverId: number | string): number {
  if (typeof serverId === "number") return serverId;
  let h = 0;
  for (let i = 0; i < serverId.length; i++) h = (h * 31 + serverId.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getMockMonthAvailability(params: {
  serverId: number | string;
  unit: RentalUnit;
  month: string; // YYYY-MM
}): CalendarDayAvailability[] {
  const [yearStr, monthStr] = params.month.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const days = monthLength(year, month);
  const numId = toNumericId(params.serverId);

  const result: CalendarDayAvailability[] = [];

  for (let day = 1; day <= days; day += 1) {
    const score = seeded(numId, year, month, day);

    let status: CalendarDayAvailability["status"] = "available";
    if (params.unit === "DAILY") {
      status = score < 2 ? "reserved" : "available";
    } else {
      status = score < 2 ? "reserved" : score < 5 ? "partial" : "available";
    }

    result.push({
      date: `${year}-${pad2(month)}-${pad2(day)}`,
      status,
    });
  }

  return result;
}

export function getMockTimeSlots(params: {
  serverId: number | string;
  unit: RentalUnit;
  date: string; // YYYY-MM-DD
}): TimeSlot[] {
  const numId = toNumericId(params.serverId);
  if (params.unit === "DAILY") {
    const start = new Date(`${params.date}T00:00:00`);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return [{ startAt: start.toISOString(), endAt: end.toISOString(), isReserved: false }];
  }

  const [yearStr, monthStr, dayStr] = params.date.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  const slots: TimeSlot[] = [];

  for (let hour = 8; hour < 24; hour += 2) {
    const start = new Date(year, month - 1, day, hour, 0, 0);
    const end = new Date(year, month - 1, day, hour + 2, 0, 0);
    const score = (seeded(numId, year, month, day) + hour) % 10;

    slots.push({
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      isReserved: score < 3,
    });
  }

  return slots;
}

export function getMockPreview(payload: {
  serverId: number | string;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
}): ReservationPreview {
  const server =
    mockServers.find((s) => s.id === payload.serverId || String(s.id) === String(payload.serverId)) ||
    mockServers[0];
  const start = new Date(payload.startAt);
  const end = new Date(payload.endAt);

  let totalAmount = 0;
  if (payload.unit === "HOURLY") {
    const hours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
    totalAmount = hours * server.hourlyPrice;
  } else {
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    totalAmount = days * server.dailyPrice;
  }

  return {
    previewId: `mock-preview-${payload.serverId}-${payload.startAt}`,
    serverId: payload.serverId,
    unit: payload.unit,
    startAt: payload.startAt,
    endAt: payload.endAt,
    totalAmount,
    currency: "IRR",
  };
}
