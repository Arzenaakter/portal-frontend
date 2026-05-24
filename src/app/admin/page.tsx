import AdminHeader from "@/components/admin/Adminheader";
import { MOCK_VIDEOS } from "@/types";
import { Video, Users, Eye, TrendingUp, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const videos = MOCK_VIDEOS;
  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);

  const stats = [
    {
      label: "Total Videos",
      value: videos.length,
      icon: Video,
      change: "+3 this week",
      color: "#e8ff47",
    },
    {
      label: "Total Views",
      value: `${(totalViews / 1000).toFixed(1)}k`,
      icon: Eye,
      change: "+12% this month",
      color: "#47e8ff",
    },
    {
      label: "Students",
      value: "5,240",
      icon: Users,
      change: "+89 this week",
      color: "#ff6432",
    },
    {
      label: "Engagement",
      value: "78%",
      icon: TrendingUp,
      change: "+5% vs last month",
      color: "#a78bfa",
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto">
      <AdminHeader title="Dashboard" subtitle="Welcome back, Admin" />

      <div className="flex-1 p-6 overflow-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, change, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5 transition-all hover:opacity-90"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg"
                  style={{
                    background: "rgba(71,232,71,0.08)",
                    color: "#4ade80",
                  }}
                >
                  <ArrowUpRight size={10} />
                  Up
                </div>
              </div>
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                }}
              >
                {value}
              </div>
              <div
                className="text-sm font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                {label}
              </div>
              <div className="text-xs" style={{ color }}>
                {change}
              </div>
            </div>
          ))}
        </div>

        {/* Recent videos */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <h2
              className="font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Recent Videos
            </h2>
            <a
              href="/admin/videos"
              className="text-xs font-semibold"
              style={{ color: "var(--primary)" }}
            >
              Manage all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  {["Title", "Category", "Views", "Date"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        color: "var(--muted-foreground)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {videos.slice(0, 5).map((video) => (
                  <tr
                    key={video.id}
                    className="border-b transition-colors hover:opacity-80"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="w-12 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <p
                            className="text-sm font-semibold line-clamp-1"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {video.title}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {video.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2 py-1 rounded-lg font-medium"
                        style={{
                          background: "rgba(232,255,71,0.1)",
                          color: "var(--primary)",
                        }}
                      >
                        {video.category}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {((video.views || 0) / 1000).toFixed(1)}k
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {new Date(video.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
