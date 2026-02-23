export type BuildBasis = "CPU" | "GPU";

export type RentalUnit = "HOURLY" | "DAILY";

export interface HardwareServer {
  id: number;
  name: string;
  cpu: string;
  gpu: string;
  ramGb: number;
  diskGb: number;
  os: string;
  hourlyPrice: number;
  dailyPrice: number;
  status: "AVAILABLE" | "MAINTENANCE" | "DISABLED";
}

export interface TimeSlot {
  startAt: string;
  endAt: string;
  isReserved: boolean;
}

export type DayAvailabilityStatus = "available" | "partial" | "reserved";

export interface CalendarDayAvailability {
  date: string; // YYYY-MM-DD
  status: DayAvailabilityStatus;
}

export interface ReservationPreview {
  previewId?: string;
  serverId: number;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
  totalAmount: number;
  currency: "IRR";
}

export interface PurchasedService {
  reservationId: number;
  serverName: string;
  startAt: string;
  endAt: string;
  totalAmount: number;
  ipAddress: string | null;
  username: string | null;
  password: string | null;
  ownerPhone?: string | null;
}

export interface DashboardStats {
  usersCount: number;
  serversCount: number;
  purchasesCount: number;
}

export interface AdminUser {
  id: number;
  fullName: string;
  phoneNumber: string;
}

export interface AdminReservation {
  reservationId: number;
  userFullName: string;
  serverName: string;
  startAt: string;
  endAt: string;
  ipAddress?: string | null;
  username?: string | null;
  password?: string | null;
}

export interface CheckoutReservationPayload {
  previewId?: string;
  serverId: number;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
  totalAmount: number;
}

export interface CheckoutReservationResult {
  success: boolean;
  reservationId: number;
}
