import axios from "axios";

const FALLBACK_MESSAGE = "خطایی رخ داد. لطفا دوباره تلاش کنید.";

/**
 * Backend error response shape (from backend response.Error).
 * Success uses { data }, errors use { error: string }.
 */
export interface BackendErrorBody {
  error?: string;
}

/**
 * Extract the message to show the user from any thrown value.
 * Prefers the backend's `error` field when present (so we show what the API returns).
 */
export function getBackendErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as BackendErrorBody | undefined;
    if (data && typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
    if (err.response?.status === 401) {
      return "لطفا دوباره وارد شوید.";
    }
    if (err.response?.status === 404) {
      return "منبع یافت نشد.";
    }
    if (err.response?.status === 500) {
      return data?.error && typeof data.error === "string" ? data.error : "خطای سرور. لطفا بعدا تلاش کنید.";
    }
    if (err.message && err.message.trim()) {
      return err.message.trim();
    }
  }
  if (err instanceof Error && err.message.trim()) {
    return err.message.trim();
  }
  return FALLBACK_MESSAGE;
}
