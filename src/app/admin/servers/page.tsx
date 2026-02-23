import AdminServersCrudClient from "@/components/hardware/AdminServersCrudClient";

export default function AdminServersPage() {
  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#244BC5]">مدیریت سرورها</h1>
        <p className="mt-2 text-sm text-slate-600">
          ایجاد، ویرایش و حذف سرورهای قابل اجاره از همین فرم انجام می‌شود.
        </p>
        <AdminServersCrudClient />
      </div>
    </div>
  );
}
