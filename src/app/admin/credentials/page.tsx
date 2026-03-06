import AdminCredentialFormClient from "@/components/hardware/AdminCredentialFormClient";

export default function AdminCredentialsPage() {
  return (
    <div>
      <h1 className="admin-section-title">تخصیص اطلاعات ورود</h1>
      <p className="admin-subtitle">برای هر رزرو، IP و نام کاربری و رمز عبور را ثبت کنید.</p>
      <AdminCredentialFormClient />
    </div>
  );
}
