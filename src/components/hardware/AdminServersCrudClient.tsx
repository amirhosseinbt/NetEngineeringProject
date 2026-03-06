"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { hardwareApi } from "@/services/hardwareApi";
import { getBackendErrorMessage } from "@/lib/apiError";
import type { HardwareServer } from "@/types/hardware";

function StatusBadge({ status }: { status: HardwareServer["status"] }) {
  const styles = {
    AVAILABLE: "bg-emerald-100 text-emerald-800",
    MAINTENANCE: "bg-amber-100 text-amber-800",
    DISABLED: "bg-slate-200 text-slate-600",
  };
  const labels = {
    AVAILABLE: "فعال",
    MAINTENANCE: "در تعمیر",
    DISABLED: "غیرفعال",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

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
  const [editId, setEditId] = useState<number | string | null>(null);

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
      toast.error(getBackendErrorMessage(error));
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
      toast.error(getBackendErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (server: HardwareServer) => {
    setEditId(server.id);
    setForm(mapServerToForm(server));
  };

  const handleDelete = async (serverId: number | string) => {
    const confirmed = window.confirm("از حذف این سرور مطمئن هستید؟");
    if (!confirmed) return;

    try {
      await hardwareApi.deleteAdminServer(serverId);
      toast.success("سرور حذف شد.");
      if (String(editId) === String(serverId)) resetForm();
      await refresh();
    } catch (error) {
      toast.error(getBackendErrorMessage(error));
    }
  };

  const updateField = <K extends keyof ServerForm>(key: K, value: ServerForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="admin-form-card">
        <div className="admin-form-header">
          {editId === null ? <Plus size={18} /> : <Pencil size={18} />}
          <span>{editId === null ? "افزودن سرور جدید" : "ویرایش سرور"}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="admin-form-group">
            <label className="admin-form-label">نام سرور</label>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="مثال: سرور پردازشی ۱"
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">پردازنده (CPU)</label>
            <input
              value={form.cpu}
              onChange={(e) => updateField("cpu", e.target.value)}
              placeholder="مثال: AMD EPYC 7763"
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">کارت گرافیک (GPU)</label>
            <input
              value={form.gpu}
              onChange={(e) => updateField("gpu", e.target.value)}
              placeholder="مثال: NVIDIA RTX 4090"
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">سیستم عامل</label>
            <input
              value={form.os}
              onChange={(e) => updateField("os", e.target.value)}
              placeholder="مثال: Ubuntu 22.04"
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">رم (GB)</label>
            <input
              value={form.ramGb}
              onChange={(e) => updateField("ramGb", e.target.value)}
              placeholder="128"
              type="number"
              min={1}
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">دیسک (GB)</label>
            <input
              value={form.diskGb}
              onChange={(e) => updateField("diskGb", e.target.value)}
              placeholder="2000"
              type="number"
              min={1}
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">قیمت ساعتی (تومان)</label>
            <input
              value={form.hourlyPrice}
              onChange={(e) => updateField("hourlyPrice", e.target.value)}
              placeholder="25000"
              type="number"
              min={1}
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">قیمت روزانه (تومان)</label>
            <input
              value={form.dailyPrice}
              onChange={(e) => updateField("dailyPrice", e.target.value)}
              placeholder="500000"
              type="number"
              min={1}
              className="input-shell"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">وضعیت</label>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value as HardwareServer["status"])}
              className="input-shell"
            >
              <option value="AVAILABLE">فعال</option>
              <option value="MAINTENANCE">در حال تعمیر</option>
              <option value="DISABLED">غیرفعال</option>
            </select>
          </div>

          <div className="admin-form-group flex items-end">
            <div className="flex w-full gap-2">
              <button onClick={handleSubmit} disabled={!canSubmit || saving} className="primary-btn flex-1">
                {saving ? "در حال ذخیره..." : editId === null ? "افزودن" : "ذخیره"}
              </button>
              {editId !== null && (
                <button onClick={resetForm} className="secondary-btn">
                  انصراف
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="admin-table-shell">
        <table className="admin-table">
          <thead>
            <tr>
              <th>نام سرور</th>
              <th>پردازنده</th>
              <th>کارت گرافیک</th>
              <th>حافظه</th>
              <th>قیمت</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="p-6 text-center" colSpan={7}>
                  در حال بارگذاری...
                </td>
              </tr>
            )}

            {!loading &&
              servers.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="font-bold text-slate-800">{s.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{s.os}</div>
                  </td>
                  <td className="text-sm text-slate-600">{s.cpu}</td>
                  <td className="text-sm text-slate-600">{s.gpu || "-"}</td>
                  <td className="text-sm text-slate-600">
                    <div>{s.ramGb} GB RAM</div>
                    <div className="text-xs text-slate-500">{s.diskGb} GB Disk</div>
                  </td>
                  <td className="text-sm">
                    <div className="font-medium text-slate-700">{s.hourlyPrice.toLocaleString("fa-IR")} / ساعت</div>
                    <div className="text-xs text-slate-500">{s.dailyPrice.toLocaleString("fa-IR")} / روز</div>
                  </td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="admin-action-btn admin-action-btn-edit"
                        title="ویرایش"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="admin-action-btn admin-action-btn-delete"
                        title="حذف"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading && servers.length === 0 && (
              <tr>
                <td className="p-6 text-center text-slate-500" colSpan={7}>
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
