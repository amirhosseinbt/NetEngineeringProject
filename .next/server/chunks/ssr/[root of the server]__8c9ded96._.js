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
"[project]/src/components/hardware/MyServicesClient.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MyServicesClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/hardwareApi.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function MyServicesClient() {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const run = async ()=>{
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hardwareApi"].getMyServices();
            setItems(data);
        };
        run();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-[#244BC5]",
                    children: "سرویس های خریداری شده من"
                }, void 0, false, {
                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-slate-600",
                    children: "لیست سرویس های خریداری شده به همراه وضعیت اطلاعات ورود."
                }, void 0, false, {
                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 grid gap-3",
                    children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative rounded-md bg-[#D9D9D9] p-4 text-sm shadow-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold text-slate-700",
                                    children: index + 1
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: item.serverName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: [
                                        "رزرو: #",
                                        item.reservationId
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: [
                                        item.startAt,
                                        " ",
                                        ":",
                                        " ",
                                        item.endAt
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: [
                                        "هزینه: ",
                                        item.totalAmount.toLocaleString(),
                                        " تومان"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                item.username && item.password && item.ipAddress ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 rounded-md bg-white p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: [
                                                "IP: ",
                                                item.ipAddress
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                            lineNumber: 39,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: [
                                                "نام کاربری: ",
                                                item.username
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                            lineNumber: 40,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: [
                                                "رمز عبور: ",
                                                item.password
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                            lineNumber: 41,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 rounded-md bg-amber-100 p-3 font-bold text-amber-700",
                                    children: "اطلاعات ورود هنوز تنظیم نشده و در اسرع وقت ثبت خواهد شد."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                                    lineNumber: 44,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.reservationId, true, {
                            fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/hardware/MyServicesClient.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__8c9ded96._.js.map