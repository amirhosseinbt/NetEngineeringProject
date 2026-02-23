module.exports = {

"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/mocks/hardware.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMockMonthAvailability": (()=>getMockMonthAvailability),
    "getMockPreview": (()=>getMockPreview),
    "getMockTimeSlots": (()=>getMockTimeSlots),
    "mockAdminReservations": (()=>mockAdminReservations),
    "mockAdminUsers": (()=>mockAdminUsers),
    "mockMyServices": (()=>mockMyServices),
    "mockServers": (()=>mockServers),
    "mockStats": (()=>mockStats)
});
const mockServers = [
    {
        id: 1,
        name: "Render Node A1",
        cpu: "AMD Ryzen 9 5900X",
        gpu: "NVIDIA RTX 5080",
        ramGb: 64,
        diskGb: 512,
        os: "Windows 11",
        hourlyPrice: 350000,
        dailyPrice: 4200000,
        status: "AVAILABLE"
    },
    {
        id: 2,
        name: "AI Node B2",
        cpu: "Intel i9-14900K",
        gpu: "NVIDIA RTX 4090",
        ramGb: 128,
        diskGb: 1024,
        os: "Ubuntu 22.04",
        hourlyPrice: 500000,
        dailyPrice: 6000000,
        status: "AVAILABLE"
    },
    {
        id: 3,
        name: "Compute Node C3",
        cpu: "AMD Ryzen 7 7800X3D",
        gpu: "NVIDIA RTX 5070",
        ramGb: 32,
        diskGb: 512,
        os: "Windows 11",
        hourlyPrice: 250000,
        dailyPrice: 3000000,
        status: "MAINTENANCE"
    }
];
const mockMyServices = [
    {
        reservationId: 5001,
        serverName: "Render Node A1",
        startAt: "2026-02-24T08:00:00.000Z",
        endAt: "2026-02-24T20:00:00.000Z",
        totalAmount: 4200000,
        ipAddress: "185.143.223.10",
        username: "user5001",
        password: "A1b2C3d4"
    },
    {
        reservationId: 5002,
        serverName: "AI Node B2",
        startAt: "2026-02-25T08:00:00.000Z",
        endAt: "2026-02-26T08:00:00.000Z",
        totalAmount: 6000000,
        ipAddress: null,
        username: null,
        password: null
    }
];
const mockAdminUsers = [
    {
        id: 1,
        fullName: "Ali Ahmadi",
        phoneNumber: "09120000001"
    },
    {
        id: 2,
        fullName: "Sara Moradi",
        phoneNumber: "09120000002"
    }
];
const mockAdminReservations = [
    {
        reservationId: 5001,
        userFullName: "Ali Ahmadi",
        serverName: "Render Node A1",
        startAt: "2026-02-24T08:00:00.000Z",
        endAt: "2026-02-24T20:00:00.000Z"
    },
    {
        reservationId: 5002,
        userFullName: "Sara Moradi",
        serverName: "AI Node B2",
        startAt: "2026-02-25T08:00:00.000Z",
        endAt: "2026-02-26T08:00:00.000Z"
    }
];
const mockStats = {
    usersCount: 2,
    serversCount: 3,
    purchasesCount: 2
};
function pad2(value) {
    return value.toString().padStart(2, "0");
}
function monthLength(year, month) {
    return new Date(year, month, 0).getDate();
}
function seeded(serverId, year, month, day) {
    return (serverId * 17 + year * 3 + month * 11 + day * 7) % 10;
}
function getMockMonthAvailability(params) {
    const [yearStr, monthStr] = params.month.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const days = monthLength(year, month);
    const result = [];
    for(let day = 1; day <= days; day += 1){
        const score = seeded(params.serverId, year, month, day);
        let status = "available";
        if (params.unit === "DAILY") {
            status = score < 2 ? "reserved" : "available";
        } else {
            status = score < 2 ? "reserved" : score < 5 ? "partial" : "available";
        }
        result.push({
            date: `${year}-${pad2(month)}-${pad2(day)}`,
            status
        });
    }
    return result;
}
function getMockTimeSlots(params) {
    if (params.unit === "DAILY") {
        const start = new Date(`${params.date}T00:00:00`);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        return [
            {
                startAt: start.toISOString(),
                endAt: end.toISOString(),
                isReserved: false
            }
        ];
    }
    const [yearStr, monthStr, dayStr] = params.date.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    const slots = [];
    for(let hour = 8; hour < 24; hour += 2){
        const start = new Date(year, month - 1, day, hour, 0, 0);
        const end = new Date(year, month - 1, day, hour + 2, 0, 0);
        const score = (seeded(params.serverId, year, month, day) + hour) % 10;
        slots.push({
            startAt: start.toISOString(),
            endAt: end.toISOString(),
            isReserved: score < 3
        });
    }
    return slots;
}
function getMockPreview(payload) {
    const server = mockServers.find((s)=>s.id === payload.serverId) || mockServers[0];
    const start = new Date(payload.startAt);
    const end = new Date(payload.endAt);
    let totalAmount = 0;
    if (payload.unit === "HOURLY") {
        const hours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
        totalAmount = hours * server.hourlyPrice;
    } else {
        const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        totalAmount = days * server.dailyPrice;
    }
    return {
        serverId: payload.serverId,
        unit: payload.unit,
        startAt: payload.startAt,
        endAt: payload.endAt,
        totalAmount,
        currency: "IRR"
    };
}
}}),
"[project]/src/services/hardwareApi.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ENDPOINTS": (()=>ENDPOINTS),
    "USE_MOCKS": (()=>USE_MOCKS),
    "hardwareApi": (()=>hardwareApi)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/hardware.ts [app-ssr] (ecmascript)");
;
;
const API_BASE = process.env.NEXT_PUBLIC_URL;
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false" || !API_BASE;
const ENDPOINTS = {
    dashboardStats: "/dashboard/stats",
    serverList: "/hardware/servers",
    serverMonthAvailability: (serverId)=>`/hardware/servers/${serverId}/calendar`,
    serverTimeSlots: (serverId)=>`/hardware/servers/${serverId}/timeslots`,
    reservationPreview: "/hardware/reservations/preview",
    reservationCheckout: "/hardware/reservations/checkout",
    userServices: "/hardware/my-services",
    adminServers: "/admin/hardware/servers",
    adminUsers: "/admin/users",
    adminReservations: "/admin/hardware/reservations",
    adminCredentials: "/admin/hardware/credentials"
};
function authHeader() {
    return {
        Authorization: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : ""
    };
}
function delay(data, ms = 250) {
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(data), ms);
    });
}
function applyServerFilters(servers, params) {
    return servers.filter((server)=>{
        if (params.basis === "CPU" && params.cpu) {
            return server.cpu.toLowerCase().includes(params.cpu.toLowerCase());
        }
        if (params.basis === "GPU" && params.gpu) {
            return server.gpu.toLowerCase().includes(params.gpu.toLowerCase());
        }
        return true;
    });
}
const hardwareApi = {
    async getDashboardStats () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStats"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.dashboardStats}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getServers (params) {
        if (USE_MOCKS) return delay(applyServerFilters(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockServers"], params));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.serverList}`, {
            params,
            headers: authHeader()
        });
        return response.data.data;
    },
    async getServerTimeSlots (serverId, params) {
        if (USE_MOCKS) {
            return delay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockTimeSlots"])({
                serverId,
                unit: params.unit,
                date: params.date
            }));
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.serverTimeSlots(serverId)}`, {
            params,
            headers: authHeader()
        });
        return response.data.data;
    },
    async getMonthAvailability (serverId, params) {
        if (USE_MOCKS) {
            return delay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockMonthAvailability"])({
                serverId,
                unit: params.unit,
                month: params.month
            }));
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.serverMonthAvailability(serverId)}`, {
            params,
            headers: authHeader()
        });
        return response.data.data;
    },
    async getReservationPreview (payload) {
        if (USE_MOCKS) return delay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockPreview"])(payload));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE}${ENDPOINTS.reservationPreview}`, payload, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async checkoutReservation (payload) {
        if (USE_MOCKS) {
            void payload;
            return delay({
                success: true
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE}${ENDPOINTS.reservationCheckout}`, payload, {
            headers: authHeader()
        });
        return {
            success: true
        };
    },
    async getMyServices () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMyServices"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.userServices}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getAdminServers () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockServers"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.adminServers}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getAdminUsers () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockAdminUsers"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.adminUsers}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getAdminReservations () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockAdminReservations"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.adminReservations}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async assignServiceCredentials (payload) {
        if (USE_MOCKS) {
            void payload;
            return delay({
                success: true
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE}${ENDPOINTS.adminCredentials}`, payload, {
            headers: authHeader()
        });
        return {
            success: true
        };
    }
};
;
}}),
"[project]/src/components/hardware/ReservationCalendar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReservationCalendar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/hardwareApi.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function pad2(value) {
    return value.toString().padStart(2, "0");
}
function toDateKey(value) {
    return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`;
}
function parseDateKey(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day, 0, 0, 0);
}
function monthKey(value) {
    return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}`;
}
function startOfMonth(value) {
    return new Date(value.getFullYear(), value.getMonth(), 1);
}
function formatDayNumber(dateKey) {
    const date = parseDateKey(dateKey);
    return new Intl.DateTimeFormat("fa-IR", {
        day: "numeric"
    }).format(date);
}
function formatMonthTitle(date) {
    return new Intl.DateTimeFormat("fa-IR", {
        month: "long",
        year: "numeric"
    }).format(date);
}
function formatDateLabel(dateKey) {
    const date = parseDateKey(dateKey);
    return new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }).format(date);
}
function formatTimeLabel(iso) {
    return new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(iso));
}
function getWeekIndex(jsDay) {
    return (jsDay + 1) % 7;
}
function buildCalendarGrid(displayMonth) {
    const first = startOfMonth(displayMonth);
    const firstIndex = getWeekIndex(first.getDay());
    const daysCount = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();
    const cells = [];
    for(let i = 0; i < firstIndex; i += 1)cells.push(null);
    for(let day = 1; day <= daysCount; day += 1){
        cells.push(toDateKey(new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)));
    }
    while(cells.length % 7 !== 0)cells.push(null);
    return cells;
}
function isRangeBlocked(fromKey, toKey, statusMap) {
    const from = parseDateKey(fromKey);
    const to = parseDateKey(toKey);
    const current = new Date(from);
    while(current <= to){
        const key = toDateKey(current);
        if (statusMap[key] === "reserved") return true;
        current.setDate(current.getDate() + 1);
    }
    return false;
}
function hasReservedSlotBetween(slots, startIndex, endIndex) {
    for(let i = startIndex; i <= endIndex; i += 1){
        if (slots[i].isReserved) return true;
    }
    return false;
}
const weekDays = [
    "ش",
    "ی",
    "د",
    "س",
    "چ",
    "پ",
    "ج"
];
function ReservationCalendar({ serverId, unit, onSelectionChange }) {
    const [displayMonth, setDisplayMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>startOfMonth(new Date()));
    const [availability, setAvailability] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingDays, setLoadingDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedDateKey, setSelectedDateKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [slots, setSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingSlots, setLoadingSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slotStartIndex, setSlotStartIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [slotEndIndex, setSlotEndIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dayStartKey, setDayStartKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dayEndKey, setDayEndKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const availabilityMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = {};
        availability.forEach((item)=>{
            map[item.date] = item.status;
        });
        return map;
    }, [
        availability
    ]);
    const grid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildCalendarGrid(displayMonth), [
        displayMonth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const run = async ()=>{
            setLoadingDays(true);
            onSelectionChange(null);
            setSelectedDateKey(null);
            setSlots([]);
            setSlotStartIndex(null);
            setSlotEndIndex(null);
            setDayStartKey(null);
            setDayEndKey(null);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hardwareApi"].getMonthAvailability(serverId, {
                    unit,
                    month: monthKey(displayMonth)
                });
                setAvailability(data);
            } finally{
                setLoadingDays(false);
            }
        };
        run();
    }, [
        displayMonth,
        serverId,
        unit,
        onSelectionChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (unit !== "HOURLY" || !selectedDateKey) {
            setSlots([]);
            setSlotStartIndex(null);
            setSlotEndIndex(null);
            return;
        }
        const run = async ()=>{
            setLoadingSlots(true);
            onSelectionChange(null);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hardwareApi"].getServerTimeSlots(serverId, {
                    unit: "HOURLY",
                    date: selectedDateKey
                });
                setSlots(data);
            } finally{
                setLoadingSlots(false);
            }
        };
        run();
    }, [
        onSelectionChange,
        selectedDateKey,
        serverId,
        unit
    ]);
    const handleDayClick = (dateKey)=>{
        const status = availabilityMap[dateKey];
        if (!status || status === "reserved") return;
        if (unit === "HOURLY") {
            setSelectedDateKey(dateKey);
            return;
        }
        if (!dayStartKey || dayStartKey && dayEndKey && dayStartKey !== dayEndKey) {
            setDayStartKey(dateKey);
            setDayEndKey(dateKey);
            const start = parseDateKey(dateKey);
            const end = new Date(start);
            end.setDate(end.getDate() + 1);
            onSelectionChange({
                startAt: start.toISOString(),
                endAt: end.toISOString()
            });
            return;
        }
        const startKey = dayStartKey <= dateKey ? dayStartKey : dateKey;
        const endKey = dayStartKey <= dateKey ? dateKey : dayStartKey;
        if (isRangeBlocked(startKey, endKey, availabilityMap)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("در بازه انتخابی روز رزرو شده وجود دارد.");
            setDayStartKey(dateKey);
            setDayEndKey(dateKey);
            const start = parseDateKey(dateKey);
            const end = new Date(start);
            end.setDate(end.getDate() + 1);
            onSelectionChange({
                startAt: start.toISOString(),
                endAt: end.toISOString()
            });
            return;
        }
        setDayStartKey(startKey);
        setDayEndKey(endKey);
        const start = parseDateKey(startKey);
        const end = parseDateKey(endKey);
        end.setDate(end.getDate() + 1);
        onSelectionChange({
            startAt: start.toISOString(),
            endAt: end.toISOString()
        });
    };
    const handleSlotClick = (index)=>{
        if (slots[index]?.isReserved) return;
        if (slotStartIndex === null) {
            setSlotStartIndex(index);
            setSlotEndIndex(index);
            onSelectionChange({
                startAt: slots[index].startAt,
                endAt: slots[index].endAt
            });
            return;
        }
        const start = Math.min(slotStartIndex, index);
        const end = Math.max(slotStartIndex, index);
        if (hasReservedSlotBetween(slots, start, end)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("بین بازه انتخابی، ساعت رزرو شده وجود دارد.");
            setSlotStartIndex(index);
            setSlotEndIndex(index);
            onSelectionChange({
                startAt: slots[index].startAt,
                endAt: slots[index].endAt
            });
            return;
        }
        setSlotStartIndex(start);
        setSlotEndIndex(end);
        onSelectionChange({
            startAt: slots[start].startAt,
            endAt: slots[end].endAt
        });
    };
    const monthTitle = formatMonthTitle(displayMonth);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-[#D9D9D9] p-4 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDisplayMonth((prev)=>new Date(prev.getFullYear(), prev.getMonth() - 1, 1)),
                                className: "rounded-md bg-white px-3 py-1 text-sm font-bold text-[#244BC5]",
                                children: "ماه قبل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-bold text-slate-800",
                                children: monthTitle
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDisplayMonth((prev)=>new Date(prev.getFullYear(), prev.getMonth() + 1, 1)),
                                className: "rounded-md bg-white px-3 py-1 text-sm font-bold text-[#244BC5]",
                                children: "ماه بعد"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 gap-2",
                        children: [
                            weekDays.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-md bg-white py-2 text-center text-xs font-bold text-slate-700",
                                    children: item
                                }, item, false, {
                                    fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this)),
                            grid.map((dateKey, index)=>{
                                if (!dateKey) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-12 rounded-md bg-[#ECECEC]"
                                    }, `empty-${index}`, false, {
                                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                        lineNumber: 278,
                                        columnNumber: 22
                                    }, this);
                                }
                                const status = availabilityMap[dateKey];
                                const isReserved = status === "reserved";
                                const isSelectedHourly = unit === "HOURLY" && selectedDateKey === dateKey;
                                const isInDailyRange = unit === "DAILY" && dayStartKey && dayEndKey && dateKey >= dayStartKey && dateKey <= dayEndKey;
                                const baseClass = isReserved ? "bg-red-100 text-red-700" : status === "partial" ? "bg-amber-100 text-amber-700" : "bg-white text-slate-800";
                                const selectedClass = isSelectedHourly || isInDailyRange ? "outline outline-2 outline-[#244BC5]" : "";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: isReserved || loadingDays,
                                    onClick: ()=>handleDayClick(dateKey),
                                    className: `h-12 rounded-md text-center text-sm font-bold ${baseClass} ${selectedClass} ${isReserved ? "cursor-not-allowed" : "hover:brightness-95"}`,
                                    title: formatDateLabel(dateKey),
                                    children: formatDayNumber(dateKey)
                                }, dateKey, false, {
                                    fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                    lineNumber: 301,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap gap-2 text-xs font-bold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md bg-white px-2 py-1 text-slate-700",
                                children: "آزاد"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md bg-amber-100 px-2 py-1 text-amber-700",
                                children: "نیمه پر (برای رزرو ساعتی)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md bg-red-100 px-2 py-1 text-red-700",
                                children: "رزرو شده"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-[#D9D9D9] p-4 shadow-xl",
                children: [
                    unit === "DAILY" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 text-sm font-bold text-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "رزرو روزانه:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "روی روزهای آزاد کلیک کنید تا بازه انتخاب شود."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this),
                            dayStartKey && dayEndKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md bg-white p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "از: ",
                                            formatDateLabel(dayStartKey)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                        lineNumber: 330,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "تا: ",
                                            formatDateLabel(dayEndKey)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                        lineNumber: 331,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 329,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-md bg-white p-3",
                                children: "هنوز بازه ای انتخاب نشده است."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 334,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                        lineNumber: 325,
                        columnNumber: 11
                    }, this),
                    unit === "HOURLY" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-slate-700",
                                children: "رزرو ساعتی:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-slate-700",
                                children: "ابتدا یک روز انتخاب کنید سپس بازه زمانی را بردارید."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this),
                            selectedDateKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-md bg-white p-2 text-sm font-bold text-slate-700",
                                children: [
                                    "تاریخ انتخابی: ",
                                    formatDateLabel(selectedDateKey)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 345,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: [
                                    loadingSlots && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "rounded-md bg-white p-3 text-sm font-bold text-slate-700",
                                        children: "در حال بارگذاری ساعت ها..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                        lineNumber: 351,
                                        columnNumber: 32
                                    }, this),
                                    !loadingSlots && selectedDateKey && slots.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "rounded-md bg-white p-3 text-sm font-bold text-slate-700",
                                        children: "ساعت قابل رزرو پیدا نشد."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                        lineNumber: 354,
                                        columnNumber: 17
                                    }, this),
                                    !loadingSlots && slots.map((slot, index)=>{
                                        const isSelected = slotStartIndex !== null && slotEndIndex !== null && index >= slotStartIndex && index <= slotEndIndex;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: slot.isReserved,
                                            onClick: ()=>handleSlotClick(index),
                                            className: `rounded-md p-2 text-right text-sm font-bold ${slot.isReserved ? "cursor-not-allowed bg-red-100 text-red-700" : isSelected ? "bg-[#244BC5] text-white" : "bg-white text-slate-700"}`,
                                            children: [
                                                formatTimeLabel(slot.startAt),
                                                " تا ",
                                                formatTimeLabel(slot.endAt)
                                            ]
                                        }, `${slot.startAt}-${slot.endAt}`, true, {
                                            fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                            lineNumber: 366,
                                            columnNumber: 21
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hardware/ReservationCalendar.tsx",
        lineNumber: 251,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/hardware/ReserveClient.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReserveClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hardware$2f$ReservationCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/hardware/ReservationCalendar.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ReserveClient({ serverId }) {
    const [unit, setUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("HOURLY");
    const [selection, setSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const checkoutHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selection) return "";
        return `/hardware/checkout/${serverId}?unit=${unit}&startAt=${encodeURIComponent(selection.startAt)}&endAt=${encodeURIComponent(selection.endAt)}`;
    }, [
        selection,
        serverId,
        unit
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-[#244BC5]",
                    children: [
                        "رزرو سرور #",
                        serverId
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-slate-600",
                    children: "تقویم حرفه ای رزرو: روزهای آزاد/رزرو شده نمایش داده می شود و می توانید بازه دقیق خود را انتخاب کنید."
                }, void 0, false, {
                    fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setUnit("HOURLY"),
                            className: `rounded-md px-4 py-2 text-sm font-bold ${unit === "HOURLY" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"}`,
                            children: "رزرو ساعتی"
                        }, void 0, false, {
                            fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setUnit("DAILY"),
                            className: `rounded-md px-4 py-2 text-sm font-bold ${unit === "DAILY" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"}`,
                            children: "رزرو روزانه"
                        }, void 0, false, {
                            fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hardware$2f$ReservationCalendar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    serverId: serverId,
                    unit: unit,
                    onSelectionChange: (value)=>setSelection(value)
                }, void 0, false, {
                    fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 rounded-xl bg-[#D9D9D9] p-4 text-sm font-bold text-slate-700",
                    children: selection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "بازه انتخابی نهایی:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "شروع: ",
                                    new Date(selection.startAt).toLocaleString("fa-IR")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "پایان: ",
                                    new Date(selection.endAt).toLocaleString("fa-IR")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: checkoutHref,
                                className: "mt-3 inline-block rounded-md bg-[#244BC5] px-3 py-2 text-white",
                                children: "ادامه به تسویه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "هنوز بازه رزرو انتخاب نشده است."
                    }, void 0, false, {
                        fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/hardware/ReserveClient.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/hardware/ReserveClient.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/hardware/ReserveClient.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__bc745dba._.js.map