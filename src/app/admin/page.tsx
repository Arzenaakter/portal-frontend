"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/Adminheader";
import { Video } from "@/types";
import { getVideosApi } from "@/lib/videoApi";
import {
  Video as VideoIcon,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideosApi()
      .then((data) => setVideos(Array.isArray(data) ? data : (data.data ?? [])))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);

  const stats = [
    {
      label: "Total Videos",
      value: loading ? "—" : videos.length,
      icon: VideoIcon,
      change: "+3 this week",
      color: "#e8ff47",
    },
    {
      label: "Total Views",
      value: loading ? "—" : `${(totalViews / 1000).toFixed(1)}k`,
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
              className="rounded-2xl p-5 transition-all hover:opacity-90 border bg-(--card) border-(--border)"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg bg-[rgba(71,232,71,0.08)] text-[#4ade80]">
                  <ArrowUpRight size={10} /> Up
                </div>
              </div>
              <div className="text-2xl font-bold mb-1 text-(--foreground) font-display">
                {value}
              </div>
              <div className="text-sm font-medium mb-1 text-(--muted-foreground)">
                {label}
              </div>
              <div className="text-xs" style={{ color }}>
                {change}
              </div>
            </div>
          ))}
        </div>

        {/* Recent videos */}
        <div className="rounded-2xl overflow-hidden border bg-(--card) border-(--border)">
          <div className="flex items-center justify-between px-6 py-4 border-b border-(--border)">
            <h2 className="font-bold font-display">Recent Videos</h2>
            <a
              href="/admin/videos"
              className="text-xs font-semibold text-(--primary)"
            >
              Manage all →
            </a>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3">
              <Loader2 size={20} className="animate-spin text-(--primary)" />
              <span className="text-sm text-(--muted-foreground)">
                Loading videos...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-(--border)">
                    {["Title", "Category", "Views", "Date"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider font-display text-(--muted-foreground)"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {videos.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-12 text-sm text-(--muted-foreground)"
                      >
                        No videos yet.{" "}
                        <a href="/admin/videos" className="text-(--primary)">
                          Add your first one →
                        </a>
                      </td>
                    </tr>
                  ) : (
                    videos.slice(0, 5).map((video) => (
                      <tr
                        key={video._id}
                        className="border-b transition-colors hover:opacity-80 border-(--border)"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={video.thumbnail}
                              alt=""
                              className="w-12 h-8 rounded-lg object-cover border border-(--border)"
                            />
                            <div>
                              <p className="text-sm font-semibold line-clamp-1 font-display">
                                {video.title}
                              </p>
                              <p className="text-xs text-(--muted-foreground) ">
                                {video.duration || "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 rounded-lg font-medium bg-[rgba(232,255,71,0.1)] text-(--primary)">
                            {video.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-(--muted-foreground)">
                          {((video.views || 0) / 1000).toFixed(1)}k
                        </td>
                        <td className="px-6 py-4 text-sm text-(--muted-foreground)">
                          {new Date(video.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
