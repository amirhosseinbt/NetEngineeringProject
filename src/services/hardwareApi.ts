import axios from "axios";
import { USE_MOCKS, authHeader, http } from "@/services/http";
import {
  getMockMonthAvailability,
  getMockPreview,
  getMockTimeSlots,
  mockAdminReservations,
  mockAdminUsers,
  mockMyServices,
  mockServers,
  mockStats,
} from "@/mocks/hardware";
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

/** Backend API server shape (snake_case, id string). */
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

const MOCK_SERVERS_STORAGE_KEY = "mock_admin_servers";
const MOCK_MY_SERVICES_STORAGE_KEY = "mock_my_services";
const MOCK_USERS_STORAGE_KEY = "mock_registered_users";

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

function applyServerFilters(
  servers: HardwareServer[],
  params: { basis?: BuildBasis; cpu?: string; gpu?: string; q?: string; status?: string }
): HardwareServer[] {
  return servers.filter((server) => {
    const q = (params.q ?? "").trim().toLowerCase();
    if (q) {
      const match =
        server.name.toLowerCase().includes(q) ||
        server.cpu.toLowerCase().includes(q) ||
        server.gpu.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (params.status && params.status !== "") {
      if (server.status !== params.status) return false;
    }
    if (params.basis === "CPU" && params.cpu?.trim()) {
      if (!server.cpu.toLowerCase().includes(params.cpu.trim().toLowerCase())) return false;
    }
    if (params.basis === "GPU" && params.gpu?.trim()) {
      if (!server.gpu.toLowerCase().includes(params.gpu.trim().toLowerCase())) return false;
    }
    return true;
  });
}

function getMockServersStore(): HardwareServer[] {
  if (typeof window === "undefined") return [...mockServers];
  const raw = localStorage.getItem(MOCK_SERVERS_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(MOCK_SERVERS_STORAGE_KEY, JSON.stringify(mockServers));
    return [...mockServers];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...mockServers];
    return parsed as HardwareServer[];
  } catch {
    return [...mockServers];
  }
}

function setMockServersStore(servers: HardwareServer[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_SERVERS_STORAGE_KEY, JSON.stringify(servers));
}

function getMockMyServicesStore(): PurchasedService[] {
  if (typeof window === "undefined") return [...mockMyServices];
  const raw = localStorage.getItem(MOCK_MY_SERVICES_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(MOCK_MY_SERVICES_STORAGE_KEY, JSON.stringify(mockMyServices));
    return [...mockMyServices];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...mockMyServices];
    return parsed as PurchasedService[];
  } catch {
    return [...mockMyServices];
  }
}

function setMockMyServicesStore(services: PurchasedService[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_MY_SERVICES_STORAGE_KEY, JSON.stringify(services));
}

function getCurrentMockPhoneFromToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  const prefix = "mock-token-";
  if (!token.startsWith(prefix)) return null;
  return token.slice(prefix.length);
}

function getCurrentRole(): "admin" | "user" {
  if (typeof window === "undefined") return "user";
  return localStorage.getItem("user_role") === "admin" ? "admin" : "user";
}

function getMockRegisteredUsers(): Array<{ firstName: string; lastName: string; phoneNumber: string }> {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Array<{ firstName: string; lastName: string; phoneNumber: string }>;
  } catch {
    return [];
  }
}

function resolveMockUserFullName(phoneNumber: string | null | undefined): string {
  if (!phoneNumber) return "کاربر ناشناس";

  const fromAdminUsers = mockAdminUsers.find((item) => item.phoneNumber === phoneNumber);
  if (fromAdminUsers) return fromAdminUsers.fullName;

  const fromRegisteredUsers = getMockRegisteredUsers().find((item) => item.phoneNumber === phoneNumber);
  if (fromRegisteredUsers) return `${fromRegisteredUsers.firstName} ${fromRegisteredUsers.lastName}`.trim();

  return "کاربر ناشناس";
}

function toAdminReservation(service: PurchasedService): AdminReservation {
  return {
    reservationId: service.reservationId,
    userFullName: resolveMockUserFullName(service.ownerPhone),
    serverName: service.serverName,
    startAt: service.startAt,
    endAt: service.endAt,
    ipAddress: service.ipAddress,
    username: service.username,
    password: service.password,
  };
}

export const hardwareApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCKS) {
      const services = getMockMyServicesStore();
      const registered = getMockRegisteredUsers();
      const usersCount = Math.max(mockStats.usersCount, mockAdminUsers.length, registered.length);
      const serversCount = getMockServersStore().length;
      const purchasesCount = services.length;
      return delay({ usersCount, serversCount, purchasesCount });
    }

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
    if (USE_MOCKS) {
      const filtered = applyServerFilters(getMockServersStore(), params);
      const page = Math.max(1, params.page ?? 1);
      const pageSize = Math.min(100, Math.max(1, params.page_size ?? 20));
      const start = (page - 1) * pageSize;
      const items = filtered.slice(start, start + pageSize);
      return delay({
        items,
        total: filtered.length,
        page,
        pageSize,
      });
    }

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

    // Backend may wrap as { data: { data: [...], total, page, page_size } } or { data: [...] }
    type PageResponse = { data?: RawServer[]; total?: number; page?: number; page_size?: number };
    const envelope = response.data as PageResponse | { data?: PageResponse };
    const page: PageResponse = envelope && typeof envelope.data === "object" && !Array.isArray(envelope.data)
      ? (envelope.data as PageResponse)
      : (envelope as PageResponse);
    const arr: RawServer[] = Array.isArray(page.data) ? page.data : [];
    const list: HardwareServer[] = arr.map((s) => ({
      id: s.id,
      name: s.name,
      cpu: s.cpu,
      gpu: s.gpu,
      ramGb: s.ram_gb,
      diskGb: s.disk_gb,
      os: s.os,
      hourlyPrice: s.hourly_price,
      dailyPrice: s.daily_price,
      status: (s.status === "AVAILABLE" || s.status === "MAINTENANCE" || s.status === "DISABLED" ? s.status : "AVAILABLE") as HardwareServer["status"],
    }));
    return {
      items: list,
      total: Number(page.total) || 0,
      page: Number(page.page) || 1,
      pageSize: Number(page.page_size) || 20,
    };
  },

  async getServer(serverId: number | string): Promise<HardwareServer | null> {
    if (USE_MOCKS) {
      const servers = getMockServersStore();
      const s = servers.find((x) => x.id === serverId || String(x.id) === String(serverId));
      return delay(s ?? null);
    }
    try {
      const response = await http.get<{ data: RawServer }>(`${ENDPOINTS.serverList}/${serverId}`, {
        headers: authHeader(),
      });
      const raw = response?.data?.data ?? response?.data;
      if (!raw || typeof raw !== "object") return null;
      const s = raw as RawServer;
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
    } catch {
      return null;
    }
  },

  async getServerTimeSlots(serverId: number | string, params: { unit: RentalUnit; date: string }): Promise<TimeSlot[]> {
    if (USE_MOCKS) {
      return delay(getMockTimeSlots({ serverId, unit: params.unit, date: params.date }));
    }

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
    if (USE_MOCKS) {
      return delay(getMockMonthAvailability({ serverId, unit: params.unit, month: params.month }));
    }

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
    if (USE_MOCKS) return delay(getMockPreview(payload));

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
    if (USE_MOCKS) {
      const services = getMockMyServicesStore();
      const servers = getMockServersStore();
      const currentPhone = getCurrentMockPhoneFromToken();
      const numericIds = services
        .map((item) => (typeof item.reservationId === "number" ? item.reservationId : 0))
        .filter((n) => n > 0);
      const nextReservationId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 5001;
      const server = servers.find((item) => item.id === payload.serverId);

      const created: PurchasedService = {
        reservationId: nextReservationId,
        serverName: server?.name ?? `Server ${payload.serverId}`,
        startAt: payload.startAt,
        endAt: payload.endAt,
        totalAmount: payload.totalAmount,
        ipAddress: null,
        username: null,
        password: null,
        ownerPhone: currentPhone,
      };

      setMockMyServicesStore([created, ...services]);
      return delay({ success: true, reservationId: nextReservationId });
    }

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
    } catch (error) {
      // Fallback for backends that still expect camelCase request body.
      response = await http.post(`${ENDPOINTS.reservationCheckout}`, payload, {
        headers: authHeader(),
      });
      void error;
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
    if (USE_MOCKS) {
      const role = getCurrentRole();
      const phone = getCurrentMockPhoneFromToken();
      const services = getMockMyServicesStore();

      if (role === "admin") return delay(services);
      if (!phone) return delay(services);

      return delay(services.filter((item) => !item.ownerPhone || item.ownerPhone === phone));
    }

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
    if (USE_MOCKS) return delay(getMockServersStore());

    const response = await http.get<{ data: HardwareServer[] }>(`${ENDPOINTS.adminServers}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async createAdminServer(payload: Omit<HardwareServer, "id">): Promise<HardwareServer> {
    if (USE_MOCKS) {
      const servers = getMockServersStore();
      const numericIds = servers
        .map((item) => (typeof item.id === "number" ? item.id : 0))
        .filter((n) => n > 0);
      const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
      const created: HardwareServer = { id: nextId, ...payload };
      const updated = [...servers, created];
      setMockServersStore(updated);
      return delay(created);
    }

    const response = await http.post<{ data: HardwareServer }>(
      `${ENDPOINTS.adminServers}`,
      payload,
      { headers: authHeader() }
    );
    return response.data.data;
  },

  async updateAdminServer(
    serverId: number,
    payload: Partial<Omit<HardwareServer, "id">>
  ): Promise<HardwareServer> {
    if (USE_MOCKS) {
      const servers = getMockServersStore();
      const index = servers.findIndex((item) => item.id === serverId);
      if (index === -1) throw new Error("SERVER_NOT_FOUND");

      const updatedServer: HardwareServer = { ...servers[index], ...payload };
      const updated = [...servers];
      updated[index] = updatedServer;
      setMockServersStore(updated);
      return delay(updatedServer);
    }

    const response = await http.patch<{ data: HardwareServer }>(
      `${ENDPOINTS.adminServers}/${serverId}`,
      payload,
      { headers: authHeader() }
    );
    return response.data.data;
  },

  async deleteAdminServer(serverId: number): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      const servers = getMockServersStore();
      const updated = servers.filter((item) => item.id !== serverId);
      setMockServersStore(updated);
      return delay({ success: true });
    }

    await http.delete(`${ENDPOINTS.adminServers}/${serverId}`, {
      headers: authHeader(),
    });
    return { success: true };
  },

  async getAdminUsers(): Promise<AdminUser[]> {
    if (USE_MOCKS) return delay(mockAdminUsers);

    const response = await http.get<{ data: AdminUser[] }>(`${ENDPOINTS.adminUsers}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getAdminReservations(): Promise<AdminReservation[]> {
    if (USE_MOCKS) {
      const fromServices = getMockMyServicesStore().map(toAdminReservation);
      if (fromServices.length > 0) return delay(fromServices);

      return delay(mockAdminReservations);
    }

    const response = await http.get<{ data: AdminReservation[] }>(
      `${ENDPOINTS.adminReservations}`,
      { headers: authHeader() }
    );
    return response.data.data;
  },

  async assignServiceCredentials(payload: {
    reservationId: number | string;
    username: string;
    password: string;
    ipAddress: string;
  }): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      const services = getMockMyServicesStore();
      const index = services.findIndex((item) => item.reservationId === payload.reservationId);

      if (index === -1) {
        services.push({
          reservationId: payload.reservationId,
          serverName: `Reservation ${payload.reservationId}`,
          startAt: new Date().toISOString(),
          endAt: new Date().toISOString(),
          totalAmount: 0,
          ipAddress: payload.ipAddress,
          username: payload.username,
          password: payload.password,
          ownerPhone: null,
        });
      } else {
        services[index] = {
          ...services[index],
          ipAddress: payload.ipAddress,
          username: payload.username,
          password: payload.password,
        };
      }

      setMockMyServicesStore(services);
      return delay({ success: true });
    }

    await http.post(`${ENDPOINTS.adminCredentials}`, payload, {
      headers: authHeader(),
    });
    return { success: true };
  },
};

export { ENDPOINTS, USE_MOCKS };
