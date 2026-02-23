import axios from "axios";
import {
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
  DashboardStats,
  HardwareServer,
  PurchasedService,
  RentalUnit,
  ReservationPreview,
  TimeSlot,
} from "@/types/hardware";

const API_BASE = process.env.NEXT_PUBLIC_URL;
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false" || !API_BASE;

const ENDPOINTS = {
  dashboardStats: "/dashboard/stats",
  serverList: "/hardware/servers",
  serverTimeSlots: (serverId: number) => `/hardware/servers/${serverId}/timeslots`,
  reservationPreview: "/hardware/reservations/preview",
  reservationCheckout: "/hardware/reservations/checkout",
  userServices: "/hardware/my-services",
  adminServers: "/admin/hardware/servers",
  adminUsers: "/admin/users",
  adminReservations: "/admin/hardware/reservations",
  adminCredentials: "/admin/hardware/credentials",
};

function authHeader() {
  return {
    Authorization: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  };
}

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

export const hardwareApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCKS) return delay(mockStats);

    const response = await axios.get<{ data: DashboardStats }>(`${API_BASE}${ENDPOINTS.dashboardStats}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getServers(params: { basis?: BuildBasis; cpu?: string; gpu?: string }): Promise<HardwareServer[]> {
    if (USE_MOCKS) return delay(applyServerFilters(mockServers, params));

    const response = await axios.get<{ data: HardwareServer[] }>(`${API_BASE}${ENDPOINTS.serverList}`, {
      params,
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getServerTimeSlots(serverId: number, params: { unit: RentalUnit; date: string }): Promise<TimeSlot[]> {
    if (USE_MOCKS) {
      void serverId;
      void params.date;
      return delay(getMockTimeSlots(params.unit));
    }

    const response = await axios.get<{ data: TimeSlot[] }>(`${API_BASE}${ENDPOINTS.serverTimeSlots(serverId)}`, {
      params,
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getReservationPreview(payload: {
    serverId: number;
    unit: RentalUnit;
    startAt: string;
    endAt: string;
  }): Promise<ReservationPreview> {
    if (USE_MOCKS) return delay(getMockPreview(payload));

    const response = await axios.post<{ data: ReservationPreview }>(
      `${API_BASE}${ENDPOINTS.reservationPreview}`,
      payload,
      { headers: authHeader() }
    );
    return response.data.data;
  },

  async checkoutReservation(payload: { previewId: string }): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      void payload;
      return delay({ success: true });
    }

    await axios.post(`${API_BASE}${ENDPOINTS.reservationCheckout}`, payload, {
      headers: authHeader(),
    });
    return { success: true };
  },

  async getMyServices(): Promise<PurchasedService[]> {
    if (USE_MOCKS) return delay(mockMyServices);

    const response = await axios.get<{ data: PurchasedService[] }>(`${API_BASE}${ENDPOINTS.userServices}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getAdminServers(): Promise<HardwareServer[]> {
    if (USE_MOCKS) return delay(mockServers);

    const response = await axios.get<{ data: HardwareServer[] }>(`${API_BASE}${ENDPOINTS.adminServers}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getAdminUsers(): Promise<AdminUser[]> {
    if (USE_MOCKS) return delay(mockAdminUsers);

    const response = await axios.get<{ data: AdminUser[] }>(`${API_BASE}${ENDPOINTS.adminUsers}`, {
      headers: authHeader(),
    });
    return response.data.data;
  },

  async getAdminReservations(): Promise<AdminReservation[]> {
    if (USE_MOCKS) return delay(mockAdminReservations);

    const response = await axios.get<{ data: AdminReservation[] }>(
      `${API_BASE}${ENDPOINTS.adminReservations}`,
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
      void payload;
      return delay({ success: true });
    }

    await axios.post(`${API_BASE}${ENDPOINTS.adminCredentials}`, payload, {
      headers: authHeader(),
    });
    return { success: true };
  },
};

export { ENDPOINTS, USE_MOCKS };
