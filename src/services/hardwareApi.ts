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
  PurchasedService,
  RentalUnit,
  ReservationPreview,
  TimeSlot,
} from "@/types/hardware";

const ENDPOINTS = {
  dashboardStats: "/dashboard/stats",
  serverList: "/hardware/servers",
  serverMonthAvailability: (serverId: number) => `/hardware/servers/${serverId}/calendar`,
  serverTimeSlots: (serverId: number) => `/hardware/servers/${serverId}/timeslots`,
  reservationPreview: "/hardware/reservations/preview",
  reservationCheckout: "/hardware/reservations/checkout",
  userServices: "/hardware/my-services",
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
  params: { basis?: BuildBasis; cpu?: string; gpu?: string }
): HardwareServer[] {
  return servers.filter((server) => {
    if (params.basis === "CPU" && params.cpu) {
      return server.cpu.toLowerCase().includes(params.cpu.toLowerCase());
    }
    if (params.basis === "GPU" && params.gpu) {
      return server.gpu.toLowerCase().includes(params.gpu.toLowerCase());
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

    const response = await http.get<{ data: DashboardStats }>(`${ENDPOINTS.dashboardStats}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getServers(params: { basis?: BuildBasis; cpu?: string; gpu?: string }): Promise<HardwareServer[]> {
    if (USE_MOCKS) return delay(applyServerFilters(getMockServersStore(), params));

    const response = await http.get<{ data: HardwareServer[] }>(`${ENDPOINTS.serverList}`, {
      params,
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getServerTimeSlots(serverId: number, params: { unit: RentalUnit; date: string }): Promise<TimeSlot[]> {
    if (USE_MOCKS) {
      return delay(getMockTimeSlots({ serverId, unit: params.unit, date: params.date }));
    }

    const response = await http.get<{ data: TimeSlot[] }>(`${ENDPOINTS.serverTimeSlots(serverId)}`, {
      params,
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getMonthAvailability(
    serverId: number,
    params: { unit: RentalUnit; month: string }
  ): Promise<CalendarDayAvailability[]> {
    if (USE_MOCKS) {
      return delay(getMockMonthAvailability({ serverId, unit: params.unit, month: params.month }));
    }

    const response = await http.get<{ data: CalendarDayAvailability[] }>(
      `${ENDPOINTS.serverMonthAvailability(serverId)}`,
      {
        params,
        headers: authHeader(),
      }
    );
    return response.data.data;
  },

  async getReservationPreview(payload: {
    serverId: number;
    unit: RentalUnit;
    startAt: string;
    endAt: string;
  }): Promise<ReservationPreview> {
    if (USE_MOCKS) return delay(getMockPreview(payload));

    const response = await http.post(`${ENDPOINTS.reservationPreview}`, payload, {
      headers: authHeader(),
    });
    const data = response?.data?.data ?? response?.data;

    const serverId = Number(data?.serverId ?? data?.server_id ?? payload.serverId);
    const unit = (data?.unit ?? payload.unit) as RentalUnit;
    const startAt = String(data?.startAt ?? data?.start_at ?? payload.startAt);
    const endAt = String(data?.endAt ?? data?.end_at ?? payload.endAt);
    const totalAmount = Number(data?.totalAmount ?? data?.total_amount ?? 0);
    const previewId = data?.previewId ?? data?.preview_id;

    if (!Number.isFinite(serverId) || !startAt || !endAt || !Number.isFinite(totalAmount)) {
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
      const nextReservationId =
        services.length > 0 ? Math.max(...services.map((item) => item.reservationId)) + 1 : 5001;
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

    if (typeof reservationId !== "number") {
      throw new Error("INVALID_CHECKOUT_RESPONSE");
    }

    return { success: true, reservationId };
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
      const response = await http.get<{ data: PurchasedService[] }>(`${ENDPOINTS.userServices}`, {
        headers: authHeader(),
      });
      return response.data?.data ?? [];
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
      const nextId = servers.length > 0 ? Math.max(...servers.map((item) => item.id)) + 1 : 1;
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
    reservationId: number;
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
