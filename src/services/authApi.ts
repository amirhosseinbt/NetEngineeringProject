import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_URL;
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false" || !API_BASE;

interface MockUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface LoginResult {
  token: string;
  isVip: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const STORAGE_KEY = "mock_registered_users";

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

export const authApi = {
  async register(payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      const users = getMockUsers();
      const exists = users.some((item) => item.phoneNumber === payload.phoneNumber);
      if (exists) {
        throw new Error("PHONE_EXISTS");
      }

      const nextUser: MockUser = {
        id: users.length + 1,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
      };

      setMockUsers([...users, nextUser]);
      return { success: true };
    }

    await axios.post(`${API_BASE}/api/register/`, {
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone_number: payload.phoneNumber,
    });

    return { success: true };
  },

  async login(payload: { phoneNumber: string }): Promise<LoginResult> {
    if (USE_MOCKS) {
      const users = getMockUsers();
      const user = users.find((item) => item.phoneNumber === payload.phoneNumber);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      return {
        token: `mock-token-${payload.phoneNumber}`,
        isVip: false,
      };
    }

    const response = await axios.post(`${API_BASE}/api/login/`, {
      phone_number: payload.phoneNumber,
    });

    return {
      token: response.data.data.token,
      isVip: Boolean(response.data.data.is_vip),
    };
  },

  async getProfile(): Promise<UserProfile> {
    if (USE_MOCKS) {
      const phone = getCurrentMockPhoneFromToken();
      if (!phone) throw new Error("UNAUTHORIZED");

      const user = getMockUsers().find((item) => item.phoneNumber === phone);
      if (!user) throw new Error("USER_NOT_FOUND");

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      };
    }

    const response = await axios.get(`${API_BASE}/api/profile/`, {
      headers: {
        Authorization: typeof window !== "undefined" ? localStorage.getItem("token") : "",
      },
    });

    return {
      firstName: response.data.data.first_name,
      lastName: response.data.data.last_name,
      phoneNumber: response.data.data.phone_number,
    };
  },

  async updateProfile(payload: UserProfile): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      const phone = getCurrentMockPhoneFromToken();
      if (!phone) throw new Error("UNAUTHORIZED");

      const users = getMockUsers();
      const currentUser = users.find((item) => item.phoneNumber === phone);
      if (!currentUser) throw new Error("USER_NOT_FOUND");

      const duplicatePhoneUser = users.find(
        (item) => item.phoneNumber === payload.phoneNumber && item.id !== currentUser.id
      );
      if (duplicatePhoneUser) throw new Error("PHONE_EXISTS");

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

    await axios.patch(
      `${API_BASE}/api/profile/`,
      {
        first_name: payload.firstName,
        last_name: payload.lastName,
        phone_number: payload.phoneNumber,
      },
      {
        headers: {
          Authorization: typeof window !== "undefined" ? localStorage.getItem("token") : "",
        },
      }
    );

    return { success: true };
  },
};

export { USE_MOCKS as AUTH_USE_MOCKS };
