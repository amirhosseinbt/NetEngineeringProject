"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";
import type { BuildBasis, HardwareServer } from "@/types/hardware";

export default function HardwareListClient() {
  const [servers, setServers] = useState<HardwareServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [basis, setBasis] = useState<BuildBasis>("GPU");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const data = await hardwareApi.getServers({
        basis,
        cpu: basis === "CPU" ? query : undefined,
        gpu: basis === "GPU" ? query : undefined,
      });
      setServers(data);
      setLoading(false);
    };

    run();
  }, [basis, query]);

  const summary = useMemo(() => `${servers.length} سرور پیدا شد`, [servers.length]);

  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#244BC5]">رزرو سخت افزار</h1>
        <p className="mt-2 text-sm text-slate-600">
          مبنای چینش را انتخاب کنید و سرور مورد نظر را برای رزرو انتخاب کنید.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setBasis("GPU")}
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              basis === "GPU" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"
            }`}
          >
            بر اساس GPU
          </button>
          <button
            onClick={() => setBasis("CPU")}
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              basis === "CPU" ? "bg-[#244BC5] text-white" : "bg-[#D9D9D9] text-slate-700"
            }`}
          >
            بر اساس CPU
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={basis === "GPU" ? "مثال: RTX 5080" : "مثال: Ryzen 9"}
            className="min-w-[260px] rounded-md border border-slate-300 px-3 py-2 text-sm outline-none"
          />
          <span className="text-sm font-bold text-slate-600">{loading ? "در حال بارگذاری..." : summary}</span>
        </div>

        <div className="mt-6 grid gap-3">
          {servers.map((server, index) => (
            <div key={server.id} className="relative rounded-md bg-[#D9D9D9] px-5 py-4 shadow-xl">
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-700">
                {index + 1}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-slate-900">{server.name}</p>
                  <p className="text-sm text-slate-700">
                    CPU: {server.cpu} | GPU: {server.gpu} | RAM: {server.ramGb}GB | Disk: {server.diskGb}GB
                  </p>
                  <p className="text-sm text-slate-700">OS: {server.os}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700">ساعتی: {server.hourlyPrice.toLocaleString()} تومان</p>
                  <p className="text-sm font-bold text-slate-700">روزانه: {server.dailyPrice.toLocaleString()} تومان</p>
                  <Link
                    href={`/hardware/reserve/${server.id}`}
                    className="mt-2 inline-block rounded-md bg-[#244BC5] px-3 py-2 text-sm font-bold text-white"
                  >
                    رزرو
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {!loading && servers.length === 0 && (
            <p className="rounded-md bg-[#D9D9D9] p-4 text-sm font-bold text-slate-700">سروری یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
}
