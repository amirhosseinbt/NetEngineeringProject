import { authHeader, http } from "@/services/http";

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

export const authApi = {
  async register(payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    password: string;
  }): Promise<RegisterResult> {
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
      if (status === 401 || status === 400) {
        return;
      }
      throw err;
    }
  },

  async refreshToken(): Promise<{ token: string }> {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
    if (!stored) {
      throw new Error("no refresh token");
    }
    const role = typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
    const endpoint = role === "admin" ? AUTH_ENDPOINTS.adminRefreshToken : AUTH_ENDPOINTS.refreshToken;
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

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const { hashPassword } = await import("@/lib/authCrypto");
    const [currentHash, newHash] = await Promise.all([
      hashPassword(currentPassword),
      hashPassword(newPassword),
    ]);
    await http.patch(
      AUTH_ENDPOINTS.profilePassword,
      { current_password: currentHash, new_password: newHash },
      { headers: authHeader() }
    );
  },
};
