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
};

export { USE_MOCKS as AUTH_USE_MOCKS };
