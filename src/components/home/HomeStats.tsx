"use client";

import { useEffect, useState } from "react";
import { Users, Server, ShoppingCart } from "lucide-react";
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
    <div className="w-full px-5 pb-6">
      <div className="rounded-xl bg-[#D9D9D9] p-4 shadow-xl">
        <p className="mb-4 text-sm font-bold text-slate-700">داشبورد مدیریتی</p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="rounded-md bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-700">{item.title}</p>
                  <Icon className="text-[#244BC5]" size={18} />
                </div>
                <p className="mt-3 text-2xl font-bold text-[#244BC5]">
                  {loading ? "..." : item.value.toLocaleString("fa-IR")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
