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
 * Map backend reservation/overlap errors to Persian for better UX.
 */
function reservationErrorToPersian(status: number | undefined, backendMessage: string): string | null {
  if (status === 409 && backendMessage) {
    const lower = backendMessage.toLowerCase();
    if (lower.includes("not available") || lower.includes("server is not available for reservation")) {
      return "این سرور در حال حاضر برای رزرو در دسترس نیست (در تعمیر یا غیرفعال).";
    }
    if (lower.includes("overlap") || lower.includes("reserved") || lower.includes("reservation")) {
      if (lower.includes("daily") || lower.includes("dates") || lower.includes("days")) {
        return "بازه انتخابی با یک رزرو موجود همپوشانی دارد. روز شروع و پایان باید کاملاً قبل یا بعد از روزهای رزرو شده باشند.";
      }
      return "بازه زمانی انتخابی با یک رزرو موجود همپوشانی دارد. لطفاً بازه دیگری انتخاب کنید.";
    }
  }
  if (status === 400 && backendMessage) {
    const lower = backendMessage.toLowerCase();
    if (lower.includes("daily") && (lower.includes("24") || lower.includes("full day"))) {
      return "رزرو روزانه باید حداقل یک روز کامل (۲۴ ساعت) و به‌صورت مضرب روز باشد.";
    }
    if (lower.includes("hourly") && (lower.includes("hour") || lower.includes("whole"))) {
      return "رزرو ساعتی باید حداقل ۱ ساعت و به‌صورت ساعات کامل باشد.";
    }
  }
  return null;
}

/**
 * Extract the message to show the user from any thrown value.
 * Prefers the backend's `error` field when present (so we show what the API returns).
 * Maps known reservation/overlap errors to Persian.
 */
export function getBackendErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as BackendErrorBody | undefined;
    const backendMsg = data && typeof data.error === "string" ? data.error.trim() : "";
    const status = err.response?.status;

    const persian = reservationErrorToPersian(status, backendMsg);
    if (persian) return persian;

    if (backendMsg) return backendMsg;
    if (status === 401) {
      return "لطفا دوباره وارد شوید.";
    }
    if (status === 404) {
      return "منبع یافت نشد.";
    }
    if (status === 500) {
      return backendMsg || "خطای سرور. لطفا بعدا تلاش کنید.";
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
