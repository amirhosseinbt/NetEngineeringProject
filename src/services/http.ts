import axios from "axios";

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

function authHeader() {
  return {
    Authorization: toAuthHeaderValue(getStoredToken()),
  };
}

const http = axios.create({
  baseURL: API_BASE,
});

export { API_BASE, USE_MOCKS, authHeader, http };
