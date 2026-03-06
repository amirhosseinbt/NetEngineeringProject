import axios from "axios";
import { authHeader, http } from "@/services/http";
import type {
  AdminReservation,
  AdminUser,
  BuildBasis,
  CalendarDayAvailability,
  CheckoutReservationPayload,
  CheckoutReservationResult,
  DashboardStats,
  HardwareServer,
  PaginatedServersResult,
  PurchasedService,
  RentalUnit,
  ReservationPreview,
  TimeSlot,
} from "@/types/hardware";

interface RawServer {
  id: string;
  name: string;
  cpu: string;
  gpu: string;
  ram_gb: number;
  disk_gb: number;
  os: string;
  hourly_price: number;
  daily_price: number;
  status: string;
}

const ENDPOINTS = {
  dashboardStats: "/api/dashboard/stats",
  serverList: "/api/hardware/servers",
  serverMonthAvailability: (serverId: number | string) => `/api/hardware/servers/${serverId}/calendar`,
  serverTimeSlots: (serverId: number | string) => `/api/hardware/servers/${serverId}/timeslots`,
  reservationPreview: "/api/hardware/reservations/preview",
  reservationCheckout: "/api/hardware/reservations/checkout",
  userServices: "/api/hardware/my-services",
  adminServers: "/admin/hardware/servers",
  adminUsers: "/admin/users",
  adminReservations: "/admin/hardware/reservations",
  adminCredentials: "/admin/hardware/credentials",
};

function mapRawServer(s: RawServer): HardwareServer {
  return {
    id: s.id,
    name: s.name,
    cpu: s.cpu,
    gpu: s.gpu,
    ramGb: s.ram_gb,
    diskGb: s.disk_gb,
    os: s.os,
    hourlyPrice: s.hourly_price,
    dailyPrice: s.daily_price,
    status: (s.status === "AVAILABLE" || s.status === "MAINTENANCE" || s.status === "DISABLED"
      ? s.status
      : "AVAILABLE") as HardwareServer["status"],
  };
}

export const hardwareApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await http.get(ENDPOINTS.dashboardStats, {
      headers: authHeader(),
    });
    const body = response.data as { data?: DashboardStats } | DashboardStats;
    const stats = (body && typeof body === "object" && "data" in body ? body.data : body) as DashboardStats;
    return {
      usersCount: Number(stats?.usersCount) || 0,
      serversCount: Number(stats?.serversCount) || 0,
      purchasesCount: Number(stats?.purchasesCount) || 0,
    };
  },

  async getServers(params: {
    basis?: BuildBasis;
    cpu?: string;
    gpu?: string;
    page?: number;
    page_size?: number;
    q?: string;
    status?: "AVAILABLE" | "MAINTENANCE" | "DISABLED";
  }): Promise<PaginatedServersResult> {
    const requestParams: Record<string, string | number | undefined> = {};
    if (params.page != null) requestParams.page = params.page;
    if (params.page_size != null) requestParams.page_size = params.page_size;
    if (params.q != null && params.q.trim() !== "") requestParams.q = params.q.trim();
    if (params.status) requestParams.status = params.status;
    if (params.cpu != null && params.cpu.trim() !== "") requestParams.cpu = params.cpu.trim();
    if (params.gpu != null && params.gpu.trim() !== "") requestParams.gpu = params.gpu.trim();

    const response = await http.get(ENDPOINTS.serverList, {
      params: requestParams,
      headers: authHeader(),
    });

    type PageResponse = { data?: RawServer[]; total?: number; page?: number; page_size?: number };
    const envelope = response.data as PageResponse | { data?: PageResponse };
    const page: PageResponse = envelope && typeof envelope.data === "object" && !Array.isArray(envelope.data)
      ? (envelope.data as PageResponse)
      : (envelope as PageResponse);
    const arr: RawServer[] = Array.isArray(page.data) ? page.data : [];

    return {
      items: arr.map(mapRawServer),
      total: Number(page.total) || 0,
      page: Number(page.page) || 1,
      pageSize: Number(page.page_size) || 20,
    };
  },

  async getServer(serverId: number | string): Promise<HardwareServer | null> {
    try {
      const response = await http.get<{ data: RawServer }>(`${ENDPOINTS.serverList}/${serverId}`, {
        headers: authHeader(),
      });
      const raw = response?.data?.data ?? response?.data;
      if (!raw || typeof raw !== "object") return null;
      return mapRawServer(raw as RawServer);
    } catch {
      return null;
    }
  },

  async getServerTimeSlots(serverId: number | string, params: { unit: RentalUnit; date: string }): Promise<TimeSlot[]> {
    const response = await http.get(`${ENDPOINTS.serverTimeSlots(serverId)}`, {
      params,
      headers: authHeader(),
    });
    const raw = response?.data?.data ?? response?.data;
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((s: { start_at?: string; end_at?: string; is_reserved?: boolean; startAt?: string; endAt?: string; isReserved?: boolean }) => ({
      startAt: s.start_at ?? s.startAt ?? "",
      endAt: s.end_at ?? s.endAt ?? "",
      isReserved: s.is_reserved ?? s.isReserved ?? false,
    }));
  },

  async getMonthAvailability(
    serverId: number | string,
    params: { unit: RentalUnit; month: string }
  ): Promise<CalendarDayAvailability[]> {
    const response = await http.get(`${ENDPOINTS.serverMonthAvailability(serverId)}`, {
      params,
      headers: authHeader(),
    });
    const raw = response?.data?.data ?? response?.data;
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((d: { date?: string; status?: string }) => ({
      date: d.date ?? "",
      status: (d.status === "available" || d.status === "partial" || d.status === "reserved" ? d.status : "available") as CalendarDayAvailability["status"],
    }));
  },

  async getReservationPreview(payload: {
    serverId: number | string;
    unit: RentalUnit;
    startAt: string;
    endAt: string;
  }): Promise<ReservationPreview> {
    const response = await http.post(`${ENDPOINTS.reservationPreview}`, payload, {
      headers: authHeader(),
    });
    const data = response?.data?.data ?? response?.data;

    const rawServerId = data?.serverId ?? data?.server_id ?? payload.serverId;
    const serverId = typeof rawServerId === "string" ? rawServerId : Number(rawServerId);
    const unit = (data?.unit ?? payload.unit) as RentalUnit;
    const startAt = String(data?.startAt ?? data?.start_at ?? payload.startAt);
    const endAt = String(data?.endAt ?? data?.end_at ?? payload.endAt);
    const totalAmount = Number(data?.totalAmount ?? data?.total_amount ?? 0);
    const previewId = data?.previewId ?? data?.preview_id;

    const validServerId = typeof serverId === "number" ? Number.isFinite(serverId) : serverId.length > 0;
    if (!validServerId || !startAt || !endAt || !Number.isFinite(totalAmount)) {
      throw new Error("INVALID_PREVIEW_RESPONSE");
    }

    return {
      previewId: typeof previewId === "string" ? previewId : undefined,
      serverId,
      unit,
      startAt,
      endAt,
      totalAmount,
      currency: "IRR",
    };
  },

  async checkoutReservation(payload: CheckoutReservationPayload): Promise<CheckoutReservationResult> {
    const requestBody = payload.previewId
      ? { preview_id: payload.previewId }
      : {
          server_id: payload.serverId,
          unit: payload.unit,
          start_at: payload.startAt,
          end_at: payload.endAt,
          total_amount: payload.totalAmount,
        };

    let response;
    try {
      response = await http.post(`${ENDPOINTS.reservationCheckout}`, requestBody, {
        headers: authHeader(),
      });
    } catch {
      response = await http.post(`${ENDPOINTS.reservationCheckout}`, payload, {
        headers: authHeader(),
      });
    }
    const reservationId =
      response?.data?.data?.reservation_id ??
      response?.data?.data?.reservationId ??
      response?.data?.reservation_id ??
      response?.data?.reservationId;

    if (reservationId == null || (typeof reservationId === "string" && reservationId.trim() === "")) {
      throw new Error("INVALID_CHECKOUT_RESPONSE");
    }

    return { success: true, reservationId: reservationId as number | string };
  },

  async getMyServices(): Promise<PurchasedService[]> {
    try {
      const response = await http.get(ENDPOINTS.userServices, {
        headers: authHeader(),
      });
      const raw = response.data?.data ?? response.data;
      const arr = Array.isArray(raw) ? raw : [];
      return arr.map((item: Record<string, unknown>) => ({
        reservationId: item.reservation_id ?? item.reservationId,
        serverName: item.server_name ?? item.serverName ?? "",
        startAt: item.start_at ?? item.startAt ?? "",
        endAt: item.end_at ?? item.endAt ?? "",
        totalAmount: Number(item.total_amount ?? item.totalAmount ?? 0),
        ipAddress: (item.ip_address ?? item.ipAddress) ?? null,
        username: (item.username ?? item.username) ?? null,
        password: (item.password ?? item.password) ?? null,
      })) as PurchasedService[];
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        return [];
      }
      throw err;
    }
  },

  async getAdminServers(): Promise<HardwareServer[]> {
    const response = await http.get(`${ENDPOINTS.adminServers}`, {
      headers: authHeader(),
    });
    const wrapper = response.data?.data ?? response.data;
    const raw = wrapper?.data ?? wrapper;
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((s: RawServer) => mapRawServer(s));
  },

  async createAdminServer(payload: Omit<HardwareServer, "id">): Promise<HardwareServer> {
    const requestBody = {
      name: payload.name,
      cpu: payload.cpu,
      gpu: payload.gpu,
      ram_gb: payload.ramGb,
      disk_gb: payload.diskGb,
      os: payload.os,
      hourly_price: payload.hourlyPrice,
      daily_price: payload.dailyPrice,
      status: payload.status,
    };

    const response = await http.post(`${ENDPOINTS.adminServers}`, requestBody, {
      headers: authHeader(),
    });
    const raw = response.data?.data ?? response.data;
    return {
      id: raw.id,
      name: raw.name,
      cpu: raw.cpu,
      gpu: raw.gpu,
      ramGb: raw.ram_gb ?? raw.ramGb,
      diskGb: raw.disk_gb ?? raw.diskGb,
      os: raw.os,
      hourlyPrice: raw.hourly_price ?? raw.hourlyPrice,
      dailyPrice: raw.daily_price ?? raw.dailyPrice,
      status: raw.status as HardwareServer["status"],
    };
  },

  async updateAdminServer(
    serverId: number | string,
    payload: Partial<Omit<HardwareServer, "id">>
  ): Promise<HardwareServer> {
    const requestBody: Record<string, unknown> = {};
    if (payload.name !== undefined) requestBody.name = payload.name;
    if (payload.cpu !== undefined) requestBody.cpu = payload.cpu;
    if (payload.gpu !== undefined) requestBody.gpu = payload.gpu;
    if (payload.ramGb !== undefined) requestBody.ram_gb = payload.ramGb;
    if (payload.diskGb !== undefined) requestBody.disk_gb = payload.diskGb;
    if (payload.os !== undefined) requestBody.os = payload.os;
    if (payload.hourlyPrice !== undefined) requestBody.hourly_price = payload.hourlyPrice;
    if (payload.dailyPrice !== undefined) requestBody.daily_price = payload.dailyPrice;
    if (payload.status !== undefined) requestBody.status = payload.status;

    const response = await http.patch(`${ENDPOINTS.adminServers}/${serverId}`, requestBody, {
      headers: authHeader(),
    });
    const raw = response.data?.data ?? response.data;
    return {
      id: raw.id,
      name: raw.name,
      cpu: raw.cpu,
      gpu: raw.gpu,
      ramGb: raw.ram_gb ?? raw.ramGb,
      diskGb: raw.disk_gb ?? raw.diskGb,
      os: raw.os,
      hourlyPrice: raw.hourly_price ?? raw.hourlyPrice,
      dailyPrice: raw.daily_price ?? raw.dailyPrice,
      status: raw.status as HardwareServer["status"],
    };
  },

  async deleteAdminServer(serverId: number | string): Promise<{ success: boolean }> {
    await http.delete(`${ENDPOINTS.adminServers}/${serverId}`, {
      headers: authHeader(),
    });
    return { success: true };
  },

  async getAdminUsers(): Promise<AdminUser[]> {
    const response = await http.get(`${ENDPOINTS.adminUsers}`, {
      headers: authHeader(),
    });
    const wrapper = response.data?.data ?? response.data;
    const raw = wrapper?.data ?? wrapper;
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((u: Record<string, unknown>) => ({
      id: u.id ?? u.account_id,
      fullName: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || String(u.full_name ?? ""),
      phoneNumber: String(u.phone_number ?? u.phoneNumber ?? ""),
      email: String(u.email ?? ""),
      createdAt: String(u.created_at ?? u.createdAt ?? ""),
    })) as AdminUser[];
  },

  async getAdminReservations(): Promise<AdminReservation[]> {
    const response = await http.get(`${ENDPOINTS.adminReservations}`, {
      headers: authHeader(),
    });
    const wrapper = response.data?.data ?? response.data;
    const raw = wrapper?.data ?? wrapper;
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((r: Record<string, unknown>) => ({
      reservationId: r.id ?? r.reservation_id ?? r.reservationId,
      userFullName: String(r.user_full_name ?? r.userFullName ?? ""),
      serverName: String(r.server_name ?? r.serverName ?? ""),
      startAt: String(r.start_at ?? r.startAt ?? ""),
      endAt: String(r.end_at ?? r.endAt ?? ""),
      totalAmount: Number(r.total_amount ?? r.totalAmount ?? 0),
      ipAddress: (r.ip_address ?? r.ipAddress) as string | null,
      username: r.username as string | null,
      password: r.password as string | null,
      userPhone: String(r.user_phone ?? r.userPhone ?? ""),
      status: String(r.status ?? "PENDING"),
    })) as AdminReservation[];
  },

  async assignServiceCredentials(payload: {
    reservationId: number | string;
    username: string;
    password: string;
    ipAddress: string;
  }): Promise<{ success: boolean }> {
    const requestBody = {
      reservation_id: String(payload.reservationId),
      ip_address: payload.ipAddress,
      username: payload.username,
      password: payload.password,
    };

    await http.post(`${ENDPOINTS.adminCredentials}`, requestBody, {
      headers: authHeader(),
    });
    return { success: true };
  },
};

export { ENDPOINTS };
