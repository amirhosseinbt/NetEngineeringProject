export type BuildBasis = "CPU" | "GPU";

export type RentalUnit = "HOURLY" | "DAILY";

export interface HardwareServer {
  /** Mock: number; Real API: UUID string */
  id: number | string;
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

export interface PaginatedServersResult {
  items: HardwareServer[];
  total: number;
  page: number;
  pageSize: number;
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
  /** Mock: number; Real API: UUID string */
  serverId: number | string;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
  totalAmount: number;
  currency: "IRR";
}

export interface PurchasedService {
  /** API returns UUID string */
  reservationId: number | string;
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
  /** API may return UUID string */
  reservationId: number | string;
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
  serverId: number | string;
  unit: RentalUnit;
  startAt: string;
  endAt: string;
  totalAmount: number;
}

export interface CheckoutReservationResult {
  success: boolean;
  /** Mock: number; Real API: UUID string */
  reservationId: number | string;
}
