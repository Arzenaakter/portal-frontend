import AdminHeader from "@/components/admin/Adminheader";
import { BarChart2 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Analytics"
        subtitle="Track your platform performance"
      />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[rgba(71,200,232,0.08)] border border-(--border)">
            <BarChart2 size={28} style={{ color: "#47c8e8" }} />
          </div>
          <h2 className="text-xl font-bold mb-2 font-display ">Analytics</h2>
          <p className="text-sm text-(--muted-foreground)">
            Coming soon — this page is under construction.
          </p>
        </div>
      </div>
    </div>
  );
}
