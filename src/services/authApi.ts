import { USE_MOCKS, authHeader, http } from "@/services/http";

interface MockUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  passwordHash?: string;
}

export interface RegisterResult {
  token: string;
  refreshToken: string;
  accountId: string;
}

export interface LoginResult {
  token: string;
  refreshToken: string;
  role: "user" | "admin";
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

const STORAGE_KEY = "mock_registered_users";
const MOCK_ADMIN_PHONE = "09990000000";

const AUTH_ENDPOINTS = {
  register: "/api/register",
  login: "/api/login",
  adminLogin: "/admin/login",
  logout: "/api/logout",
  adminLogout: "/admin/logout",
  refreshToken: "/api/refresh-token",
  adminRefreshToken: "/admin/refresh-token",
  profile: "/api/profile",
  profilePassword: "/api/profile/password",
} as const;

function getMockUsers(): MockUser[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setMockUsers(users: MockUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getCurrentMockPhoneFromToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  const prefix = "mock-token-";
  if (!token.startsWith(prefix)) return null;
  return token.slice(prefix.length);
}

const MOCK_REFRESH_PREFIX = "mock-refresh-";

export const authApi = {
  async register(payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    password: string;
  }): Promise<RegisterResult> {
    if (USE_MOCKS) {
      const users = getMockUsers();
      const exists = users.some((item) => item.phoneNumber === payload.phoneNumber);
      if (exists) {
        throw new Error("phone number already registered");
      }

      const nextUser: MockUser = {
        id: users.length + 1,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        passwordHash: payload.password,
      };

      setMockUsers([...users, nextUser]);
      const mockToken = `mock-token-${payload.phoneNumber}`;
      const mockRefresh = `${MOCK_REFRESH_PREFIX}${payload.phoneNumber}-${Date.now()}`;
      return {
        token: mockToken,
        refreshToken: mockRefresh,
        accountId: String(nextUser.id),
      };
    }

    const response = await http.post(AUTH_ENDPOINTS.register, {
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone_number: payload.phoneNumber,
      email: payload.email ?? "",
      password: payload.password,
    });

    const data = response.data?.data ?? response.data;
    return {
      token: data.token,
      refreshToken: data.refresh_token,
      accountId: data.account_id,
    };
  },

  async login(payload: {
    phoneNumber: string;
    password: string;
    role: "user" | "admin";
  }): Promise<LoginResult> {
    if (USE_MOCKS) {
      if (payload.role === "admin") {
        if (payload.phoneNumber !== MOCK_ADMIN_PHONE) {
          throw new Error("account not found");
        }
        return {
          token: `mock-admin-token-${payload.phoneNumber}`,
          refreshToken: `${MOCK_REFRESH_PREFIX}admin-${payload.phoneNumber}`,
          role: "admin",
        };
      }

      const users = getMockUsers();
      const user = users.find((item) => item.phoneNumber === payload.phoneNumber);
      if (!user) {
        throw new Error("account not found");
      }
      const storedHash = user.passwordHash ?? "";
      if (storedHash && storedHash !== payload.password) {
        throw new Error("invalid credentials");
      }
      return {
        token: `mock-token-${payload.phoneNumber}`,
        refreshToken: `${MOCK_REFRESH_PREFIX}${payload.phoneNumber}-${Date.now()}`,
        role: "user",
      };
    }

    const endpoint = payload.role === "admin" ? AUTH_ENDPOINTS.adminLogin : AUTH_ENDPOINTS.login;
    const response = await http.post(endpoint, {
      phone_number: payload.phoneNumber,
      password: payload.password,
    });

    const data = response.data?.data ?? response.data;
    return {
      token: data.token,
      refreshToken: data.refresh_token,
      role: data.role ?? payload.role,
    };
  },

  async logout(refreshToken?: string): Promise<void> {
    if (USE_MOCKS) {
      return;
    }

    const token =
      refreshToken ??
      (typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null) ??
      "";
    const role = typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
    const endpoint = role === "admin" ? AUTH_ENDPOINTS.adminLogout : AUTH_ENDPOINTS.logout;

    try {
      await http.post(
        endpoint,
        { refresh_token: token },
        { headers: authHeader() }
      );
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        // Token expired; still consider logout successful for UI
        return;
      }
      if (status === 400) {
        // Missing or invalid refresh_token; still consider logout successful (clear local state)
        return;
      }
      throw err;
    }
  },

  /**
   * Exchange refresh_token for a new access token. Use when access token is expired or about to expire.
   */
  async refreshToken(): Promise<{ token: string }> {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
    if (!stored) {
      throw new Error("no refresh token");
    }
    if (USE_MOCKS) {
      const current =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      return { token: current || `mock-token-${Date.now()}` };
    }
    const role = typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
    const endpoint = role === "admin" ? AUTH_ENDPOINTS.adminRefreshToken : AUTH_ENDPOINTS.refreshToken;
    // No Authorization header: refresh is public and uses only refresh_token in body
    const response = await http.post<{ data?: { token?: string }; token?: string }>(
      endpoint,
      { refresh_token: stored }
    );
    const data = response.data?.data ?? response.data;
    const token = data?.token ?? "";
    if (!token) throw new Error("refresh failed");
    return { token };
  },

  async getProfile(): Promise<UserProfile> {
    if (USE_MOCKS) {
      const phone = getCurrentMockPhoneFromToken();
      if (!phone) throw new Error("unauthorized");

      const user = getMockUsers().find((item) => item.phoneNumber === phone);
      if (!user) throw new Error("account not found");

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      };
    }

    const response = await http.get(AUTH_ENDPOINTS.profile, {
      headers: authHeader(),
    });

    return {
      firstName: response.data.data.first_name,
      lastName: response.data.data.last_name,
      phoneNumber: response.data.data.phone_number,
      email: response.data.data.email ?? "",
    };
  },

  async updateProfile(payload: UserProfile): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      const phone = getCurrentMockPhoneFromToken();
      if (!phone) throw new Error("unauthorized");

      const users = getMockUsers();
      const currentUser = users.find((item) => item.phoneNumber === phone);
      if (!currentUser) throw new Error("account not found");

      const duplicatePhoneUser = users.find(
        (item) => item.phoneNumber === payload.phoneNumber && item.id !== currentUser.id
      );
      if (duplicatePhoneUser) throw new Error("phone number already registered");

      const updatedUsers = users.map((item) =>
        item.id === currentUser.id
          ? {
              ...item,
              firstName: payload.firstName,
              lastName: payload.lastName,
              phoneNumber: payload.phoneNumber,
            }
          : item
      );

      setMockUsers(updatedUsers);
      localStorage.setItem("token", `mock-token-${payload.phoneNumber}`);
      return { success: true };
    }

    await http.patch(
      AUTH_ENDPOINTS.profile,
      {
        first_name: payload.firstName,
        last_name: payload.lastName,
        phone_number: payload.phoneNumber,
        email: payload.email ?? "",
      },
      {
        headers: authHeader(),
      }
    );

    return { success: true };
  },

  /**
   * Update current user password. Pass plain passwords; they are hashed (SHA-256) before sending.
   */
  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const { hashPassword } = await import("@/lib/authCrypto");
    const [currentHash, newHash] = await Promise.all([
      hashPassword(currentPassword),
      hashPassword(newPassword),
    ]);
    if (USE_MOCKS) {
      const phone = getCurrentMockPhoneFromToken();
      if (!phone) throw new Error("unauthorized");
      const users = getMockUsers();
      const currentUser = users.find((item) => item.phoneNumber === phone);
      if (!currentUser) throw new Error("account not found");
      const storedHash = currentUser.passwordHash ?? "";
      if (storedHash !== currentHash) throw new Error("current password is incorrect");
      const updatedUsers = users.map((item) =>
        item.id === currentUser.id ? { ...item, passwordHash: newHash } : item
      );
      setMockUsers(updatedUsers);
      return;
    }
    await http.patch(
      AUTH_ENDPOINTS.profilePassword,
      { current_password: currentHash, new_password: newHash },
      { headers: authHeader() }
    );
  },
};

export { USE_MOCKS as AUTH_USE_MOCKS };
