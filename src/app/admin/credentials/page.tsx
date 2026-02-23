import AdminCredentialFormClient from "@/components/hardware/AdminCredentialFormClient";

export default function AdminCredentialsPage() {
  return (
    <div className="page-shell">
      <div className="content-shell max-w-4xl">
        <h1 className="section-title">تخصیص اطلاعات ورود سرویس</h1>
        <p className="mt-2 text-sm text-slate-600">
          برای هر رزرو، آدرس IP و نام کاربری و رمز عبور را تعیین کنید.
        </p>
        <AdminCredentialFormClient />
      </div>
    </div>
  );
}
