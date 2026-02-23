"use client";

import { useEffect, useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";
import type { PurchasedService } from "@/types/hardware";

export default function MyServicesClient() {
  const [items, setItems] = useState<PurchasedService[]>([]);

  useEffect(() => {
    const run = async () => {
      const data = await hardwareApi.getMyServices();
      setItems(data);
    };
    run();
  }, []);

  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#244BC5]">سرویس های خریداری شده من</h1>
        <p className="mt-2 text-sm text-slate-600">
          لیست سرویس های خریداری شده به همراه وضعیت اطلاعات ورود.
        </p>

        <div className="mt-5 grid gap-3">
          {items.map((item, index) => (
            <div key={item.reservationId} className="relative rounded-md bg-[#D9D9D9] p-4 text-sm shadow-xl">
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold text-slate-700">
                {index + 1}
              </span>
              <p className="font-bold">{item.serverName}</p>
              <p className="font-bold">رزرو: #{item.reservationId}</p>
              <p className="font-bold">{item.startAt} {":"} {item.endAt}</p>
              <p className="font-bold">هزینه: {item.totalAmount.toLocaleString()} تومان</p>

              {item.username && item.password && item.ipAddress ? (
                <div className="mt-2 rounded-md bg-white p-3">
                  <p className="font-bold">IP: {item.ipAddress}</p>
                  <p className="font-bold">نام کاربری: {item.username}</p>
                  <p className="font-bold">رمز عبور: {item.password}</p>
                </div>
              ) : (
                <p className="mt-2 rounded-md bg-amber-100 p-3 font-bold text-amber-700">
                  اطلاعات ورود هنوز تنظیم نشده و در اسرع وقت ثبت خواهد شد.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
