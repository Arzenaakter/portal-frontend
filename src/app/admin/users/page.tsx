import AdminHeader from "@/components/admin/Adminheader";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Users" subtitle="Manage your platform users" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[rgba(232,255,71,0.08)] border border-(--border)">
            <Users size={28} style={{ color: "var(--primary)" }} />
          </div>
          <h2 className="text-xl font-bold mb-2 font-display">
            Users Management
          </h2>
          <p className="text-sm text-(--muted-foreground)">
            Coming soon — this page is under construction.
          </p>
        </div>
      </div>
    </div>
  );
}
