import axios, { type InternalAxiosRequestConfig } from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_URL ||
  "";

const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === "true" ||
  (!process.env.NEXT_PUBLIC_USE_MOCKS && !API_BASE);

function getStoredToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

function toAuthHeaderValue(token: string): string {
  if (!token) return "";
  if (token.startsWith("Bearer ")) return token;
  return `Bearer ${token}`;
}

function setAuthHeader(config: InternalAxiosRequestConfig, token: string): void {
  const value = toAuthHeaderValue(token);
  if (config.headers && typeof (config.headers as Record<string, unknown>).set === "function") {
    (config.headers as { set: (k: string, v: string) => void }).set("Authorization", value);
  } else if (config.headers && typeof config.headers === "object") {
    (config.headers as Record<string, string>)["Authorization"] = value;
  } else {
    config.headers = { Authorization: value } as InternalAxiosRequestConfig["headers"];
  }
}

function authHeader() {
  return {
    Authorization: toAuthHeaderValue(getStoredToken()),
  };
}

/** Called on 401 to obtain a new access token; if returns a string, the failed request is retried with it. */
let refreshTokenFn: (() => Promise<string | null>) | null = null;

export function setRefreshTokenFn(fn: (() => Promise<string | null>) | null) {
  refreshTokenFn = fn;
}

function isAuthEndpoint(url: string): boolean {
  const u = url ?? "";
  return (
    u.includes("/login") ||
    u.includes("/register") ||
    u.includes("/refresh-token")
  );
}

/** Single in-flight refresh: concurrent 401s wait for the same refresh and then retry with the new token. */
let refreshPromise: Promise<string | null> | null = null;

const http = axios.create({
  baseURL: API_BASE,
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (
      err.response?.status === 401 &&
      refreshTokenFn &&
      !config._retry &&
      !isAuthEndpoint(config.url ?? "")
    ) {
      config._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = refreshTokenFn().finally(() => {
            refreshPromise = null;
          });
        }
        const newToken = await refreshPromise;
        if (newToken && typeof window !== "undefined") {
          localStorage.setItem("token", newToken);
          setAuthHeader(config, newToken);
          return http.request(config);
        }
      } catch {
        refreshPromise = null;
        // fall through and reject with original 401
      }
    }
    return Promise.reject(err);
  }
);

export { API_BASE, USE_MOCKS, authHeader, http };
