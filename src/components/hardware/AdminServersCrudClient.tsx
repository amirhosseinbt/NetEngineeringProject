"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { hardwareApi } from "@/services/hardwareApi";
import type { HardwareServer } from "@/types/hardware";

interface ServerForm {
  name: string;
  cpu: string;
  gpu: string;
  ramGb: string;
  diskGb: string;
  os: string;
  hourlyPrice: string;
  dailyPrice: string;
  status: HardwareServer["status"];
}

const initialForm: ServerForm = {
  name: "",
  cpu: "",
  gpu: "",
  ramGb: "",
  diskGb: "",
  os: "",
  hourlyPrice: "",
  dailyPrice: "",
  status: "AVAILABLE",
};

function mapServerToForm(server: HardwareServer): ServerForm {
  return {
    name: server.name,
    cpu: server.cpu,
    gpu: server.gpu,
    ramGb: String(server.ramGb),
    diskGb: String(server.diskGb),
    os: server.os,
    hourlyPrice: String(server.hourlyPrice),
    dailyPrice: String(server.dailyPrice),
    status: server.status,
  };
}

function mapFormToPayload(form: ServerForm): Omit<HardwareServer, "id"> {
  return {
    name: form.name.trim(),
    cpu: form.cpu.trim(),
    gpu: form.gpu.trim(),
    ramGb: Number(form.ramGb),
    diskGb: Number(form.diskGb),
    os: form.os.trim(),
    hourlyPrice: Number(form.hourlyPrice),
    dailyPrice: Number(form.dailyPrice),
    status: form.status,
  };
}

export default function AdminServersCrudClient() {
  const [servers, setServers] = useState<HardwareServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ServerForm>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      form.cpu.trim().length > 1 &&
      form.gpu.trim().length > 1 &&
      form.os.trim().length > 1 &&
      Number(form.ramGb) > 0 &&
      Number(form.diskGb) > 0 &&
      Number(form.hourlyPrice) > 0 &&
      Number(form.dailyPrice) > 0
    );
  }, [form]);

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await hardwareApi.getAdminServers();
      setServers(list);
    } catch (error) {
      console.log(error);
      toast.error("بارگذاری لیست سرورها انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setSaving(true);
      const payload = mapFormToPayload(form);

      if (editId === null) {
        await hardwareApi.createAdminServer(payload);
        toast.success("سرور جدید با موفقیت ایجاد شد.");
      } else {
        await hardwareApi.updateAdminServer(editId, payload);
        toast.success("سرور با موفقیت ویرایش شد.");
      }

      resetForm();
      await refresh();
    } catch (error) {
      console.log(error);
      toast.error("عملیات ذخیره سازی انجام نشد.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (server: HardwareServer) => {
    setEditId(server.id);
    setForm(mapServerToForm(server));
  };

  const handleDelete = async (serverId: number) => {
    const confirmed = window.confirm("از حذف این سرور مطمئن هستید؟");
    if (!confirmed) return;

    try {
      await hardwareApi.deleteAdminServer(serverId);
      toast.success("سرور حذف شد.");
      if (editId === serverId) resetForm();
      await refresh();
    } catch (error) {
      console.log(error);
      toast.error("حذف سرور انجام نشد.");
    }
  };

  const updateField = <K extends keyof ServerForm>(key: K, value: ServerForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
      <div className="muted-panel">
        <p className="mb-3 text-sm font-bold text-slate-700">
          {editId === null ? "ایجاد سرور جدید" : `ویرایش سرور #${editId}`}
        </p>

        <div className="grid gap-2">
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="نام سرور"
            className="input-shell"
          />
          <input
            value={form.cpu}
            onChange={(e) => updateField("cpu", e.target.value)}
            placeholder="پردازنده"
            className="input-shell"
          />
          <input
            value={form.gpu}
            onChange={(e) => updateField("gpu", e.target.value)}
            placeholder="کارت گرافیک"
            className="input-shell"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              value={form.ramGb}
              onChange={(e) => updateField("ramGb", e.target.value)}
              placeholder="رم (GB)"
              type="number"
              min={1}
              className="input-shell"
            />
            <input
              value={form.diskGb}
              onChange={(e) => updateField("diskGb", e.target.value)}
              placeholder="دیسک (GB)"
              type="number"
              min={1}
              className="input-shell"
            />
          </div>

          <input
            value={form.os}
            onChange={(e) => updateField("os", e.target.value)}
            placeholder="سیستم عامل"
            className="input-shell"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              value={form.hourlyPrice}
              onChange={(e) => updateField("hourlyPrice", e.target.value)}
              placeholder="قیمت ساعتی"
              type="number"
              min={1}
              className="input-shell"
            />
            <input
              value={form.dailyPrice}
              onChange={(e) => updateField("dailyPrice", e.target.value)}
              placeholder="قیمت روزانه"
              type="number"
              min={1}
              className="input-shell"
            />
          </div>

          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value as HardwareServer["status"])}
            className="input-shell"
          >
            <option value="AVAILABLE">فعال</option>
            <option value="MAINTENANCE">در حال تعمیر</option>
            <option value="DISABLED">غیرفعال</option>
          </select>

          <div className="mt-2 flex gap-2">
            <button onClick={handleSubmit} disabled={!canSubmit || saving} className="primary-btn">
              {saving ? "در حال ذخیره..." : editId === null ? "ایجاد سرور" : "ذخیره ویرایش"}
            </button>

            {editId !== null && (
              <button onClick={resetForm} className="secondary-btn">
                انصراف
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-shell">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">نام سرور</th>
              <th className="p-2">CPU / GPU</th>
              <th className="p-2">RAM / Disk</th>
              <th className="p-2">وضعیت</th>
              <th className="p-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="p-4 text-center font-bold text-slate-700" colSpan={5}>
                  در حال بارگذاری...
                </td>
              </tr>
            )}

            {!loading &&
              servers.map((s) => (
                <tr key={s.id} className="border-t border-slate-300 font-bold text-slate-700">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">
                    <div>{s.cpu}</div>
                    <div>{s.gpu}</div>
                  </td>
                  <td className="p-2">{s.ramGb}GB / {s.diskGb}GB</td>
                  <td className="p-2">
                    {s.status === "AVAILABLE" ? "فعال" : s.status === "MAINTENANCE" ? "در حال تعمیر" : "غیرفعال"}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="secondary-btn px-2 py-1 text-xs"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="danger-btn"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading && servers.length === 0 && (
              <tr>
                <td className="p-4 text-center font-bold text-slate-700" colSpan={5}>
                  هنوز سروری تعریف نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
