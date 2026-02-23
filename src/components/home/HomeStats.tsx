"use client";

import { useEffect, useState } from "react";
import { Activity, Server, ShoppingCart, Users } from "lucide-react";
import { hardwareApi } from "@/services/hardwareApi";
import type { DashboardStats } from "@/types/hardware";

const defaultStats: DashboardStats = {
  usersCount: 0,
  serversCount: 0,
  purchasesCount: 0,
};

export default function HomeStats() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await hardwareApi.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log(error);
        setStats(defaultStats);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const cards = [
    {
      id: 1,
      title: "تعداد کاربران",
      value: stats.usersCount,
      icon: Users,
    },
    {
      id: 2,
      title: "تعداد سرورها",
      value: stats.serversCount,
      icon: Server,
    },
    {
      id: 3,
      title: "تعداد خریدها",
      value: stats.purchasesCount,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="page-shell pb-4">
      <div className="dashboard-hero">
        <div className="relative z-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#4b64b8]">نمای کلی سامانه</p>
              <p className="mt-1 text-xl font-extrabold text-[#1f2f67] md:text-2xl">داشبورد مدیریتی</p>
            </div>
            <span className="metric-pill">
              <Activity size={13} className="ml-1" />
              بروزرسانی زنده
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="metric-card">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-bold text-slate-700">{item.title}</p>
                  <span className="rounded-lg bg-[#edf2ff] p-2 text-[#244BC5]">
                    <Icon size={18} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-[#244BC5] md:text-4xl">
                  {loading ? "..." : item.value.toLocaleString("fa-IR")}
                </p>
                <p className="mt-2 text-xs font-bold text-slate-500">آخرین وضعیت ثبت شده</p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
