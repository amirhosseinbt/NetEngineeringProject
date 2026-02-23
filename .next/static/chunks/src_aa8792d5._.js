(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_aa8792d5._.js", {

"[project]/src/mocks/hardware.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/hardwareApi.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ENDPOINTS": (()=>ENDPOINTS),
    "USE_MOCKS": (()=>USE_MOCKS),
    "hardwareApi": (()=>hardwareApi)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/hardware.ts [app-client] (ecmascript)");
;
;
const API_BASE = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_URL;
const USE_MOCKS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USE_MOCKS !== "false" || !API_BASE;
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
        Authorization: ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : ("TURBOPACK unreachable", undefined)
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
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStats"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.dashboardStats}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getServers (params) {
        if (USE_MOCKS) return delay(applyServerFilters(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockServers"], params));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.serverList}`, {
            params,
            headers: authHeader()
        });
        return response.data.data;
    },
    async getServerTimeSlots (serverId, params) {
        if (USE_MOCKS) {
            return delay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMockTimeSlots"])({
                serverId,
                unit: params.unit,
                date: params.date
            }));
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.serverTimeSlots(serverId)}`, {
            params,
            headers: authHeader()
        });
        return response.data.data;
    },
    async getMonthAvailability (serverId, params) {
        if (USE_MOCKS) {
            return delay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMockMonthAvailability"])({
                serverId,
                unit: params.unit,
                month: params.month
            }));
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.serverMonthAvailability(serverId)}`, {
            params,
            headers: authHeader()
        });
        return response.data.data;
    },
    async getReservationPreview (payload) {
        if (USE_MOCKS) return delay((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMockPreview"])(payload));
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE}${ENDPOINTS.reservationPreview}`, payload, {
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE}${ENDPOINTS.reservationCheckout}`, payload, {
            headers: authHeader()
        });
        return {
            success: true
        };
    },
    async getMyServices () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockMyServices"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.userServices}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getAdminServers () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockServers"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.adminServers}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getAdminUsers () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockAdminUsers"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.adminUsers}`, {
            headers: authHeader()
        });
        return response.data.data;
    },
    async getAdminReservations () {
        if (USE_MOCKS) return delay(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$hardware$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockAdminReservations"]);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE}${ENDPOINTS.adminReservations}`, {
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE}${ENDPOINTS.adminCredentials}`, payload, {
            headers: authHeader()
        });
        return {
            success: true
        };
    }
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/hardware/AdminCredentialFormClient.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AdminCredentialFormClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/hardwareApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AdminCredentialFormClient() {
    _s();
    const [reservationId, setReservationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("5002");
    const [ipAddress, setIpAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("185.143.223.11");
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("user5002");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("B2c3D4e5");
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async ()=>{
        setSaved(false);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$hardwareApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hardwareApi"].assignServiceCredentials({
            reservationId: Number(reservationId),
            ipAddress,
            username,
            password
        });
        setSaved(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 grid max-w-lg gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: reservationId,
                onChange: (e)=>setReservationId(e.target.value),
                className: "rounded-md border border-slate-300 px-3 py-2 text-sm",
                placeholder: "شماره رزرو"
            }, void 0, false, {
                fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: ipAddress,
                onChange: (e)=>setIpAddress(e.target.value),
                className: "rounded-md border border-slate-300 px-3 py-2 text-sm",
                placeholder: "آدرس IP"
            }, void 0, false, {
                fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: username,
                onChange: (e)=>setUsername(e.target.value),
                className: "rounded-md border border-slate-300 px-3 py-2 text-sm",
                placeholder: "نام کاربری"
            }, void 0, false, {
                fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: password,
                onChange: (e)=>setPassword(e.target.value),
                className: "rounded-md border border-slate-300 px-3 py-2 text-sm",
                placeholder: "رمز عبور"
            }, void 0, false, {
                fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: submit,
                className: "rounded-md bg-[#244BC5] px-4 py-2 text-sm font-bold text-white",
                children: "ثبت اطلاعات ورود"
            }, void 0, false, {
                fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-md bg-green-100 p-3 text-sm font-bold text-green-700",
                children: "اطلاعات ورود با موفقیت ثبت شد."
            }, void 0, false, {
                fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hardware/AdminCredentialFormClient.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(AdminCredentialFormClient, "8cDEEPdjYpALH+BbLngqZUuU6cU=");
_c = AdminCredentialFormClient;
var _c;
__turbopack_context__.k.register(_c, "AdminCredentialFormClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_aa8792d5._.js.map