"use client";

import { useState } from "react";
import { hardwareApi } from "@/services/hardwareApi";

export default function AdminCredentialFormClient() {
  const [reservationId, setReservationId] = useState("5002");
  const [ipAddress, setIpAddress] = useState("185.143.223.11");
  const [username, setUsername] = useState("user5002");
  const [password, setPassword] = useState("B2c3D4e5");
  const [saved, setSaved] = useState(false);

  const submit = async () => {
    setSaved(false);
    await hardwareApi.assignServiceCredentials({
      reservationId: Number(reservationId),
      ipAddress,
      username,
      password,
    });
    setSaved(true);
  };

  return (
    <div className="mt-5 grid max-w-lg gap-3">
      <input
        value={reservationId}
        onChange={(e) => setReservationId(e.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        placeholder="شماره رزرو"
      />
      <input
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        placeholder="آدرس IP"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        placeholder="نام کاربری"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        placeholder="رمز عبور"
      />
      <button
        onClick={submit}
        className="rounded-md bg-[#244BC5] px-4 py-2 text-sm font-bold text-white"
      >
        ثبت اطلاعات ورود
      </button>

      {saved && (
        <p className="rounded-md bg-green-100 p-3 text-sm font-bold text-green-700">
          اطلاعات ورود با موفقیت ثبت شد.
        </p>
      )}
    </div>
  );
}
