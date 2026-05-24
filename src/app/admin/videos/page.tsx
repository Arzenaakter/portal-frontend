"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/Adminheader";
import VideoForm from "@/components/admin/Videoform";
import { Video, MOCK_VIDEOS } from "@/types";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
  Clock,
  X,
  AlertTriangle,
} from "lucide-react";

type SortField = "title" | "category" | "views" | "createdAt";
type SortDir = "asc" | "desc";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ field: SortField; dir: SortDir }>({
    field: "createdAt",
    dir: "desc",
  });
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Filter + sort
  const filtered = videos
    .filter((v) =>
      [v.title, v.category, v.subcategory, v.caption].some((f) =>
        f.toLowerCase().includes(search.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      if (sort.field === "views")
        return ((a.views || 0) - (b.views || 0)) * dir;
      if (sort.field === "createdAt")
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          dir
        );
      return a[sort.field].localeCompare(b[sort.field]) * dir;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" },
    );
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span
      className="ml-1 inline-flex flex-col"
      style={{ opacity: sort.field === field ? 1 : 0.3 }}
    >
      <ChevronUp
        size={10}
        style={{
          color:
            sort.field === field && sort.dir === "asc"
              ? "var(--primary)"
              : "var(--muted-foreground)",
          marginBottom: -2,
        }}
      />
      <ChevronDown
        size={10}
        style={{
          color:
            sort.field === field && sort.dir === "desc"
              ? "var(--primary)"
              : "var(--muted-foreground)",
        }}
      />
    </span>
  );

  const handleAdd = (data: Omit<Video, "id" | "views" | "duration">) => {
    const newVideo: Video = {
      ...data,
      id: Date.now().toString(),
      views: 0,
      duration: "—",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setVideos((prev) => [newVideo, ...prev]);
    setFormMode(null);
  };

  const handleEdit = (data: Partial<Video>) => {
    if (!editingVideo) return;
    setVideos((prev) =>
      prev.map((v) => (v.id === editingVideo.id ? { ...v, ...data } : v)),
    );
    setEditingVideo(null);
    setFormMode(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setVideos((prev) => prev.filter((v) => v.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const isFormOpen = formMode !== null;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main content */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isFormOpen ? "hidden lg:flex lg:w-1/2 xl:w-3/5" : "w-full"}`}
      >
        <AdminHeader
          title="Videos"
          subtitle={`${videos.length} total videos`}
        />

        <div className="flex-1 overflow-auto p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--muted-foreground)" }}
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search videos..."
                className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none w-64"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            <button
              onClick={() => {
                setFormMode("add");
                setEditingVideo(null);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "var(--primary)",
                color: "black",
                fontFamily: "var(--font-display)",
              }}
            >
              <Plus size={16} />
              Add Video
            </button>
          </div>

          {/* Table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                      background: "rgba(30,32,38,0.5)",
                    }}
                  >
                    <th className="text-left px-5 py-3.5 w-12">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        #
                      </span>
                    </th>
                    {[
                      { label: "Video", field: "title" as SortField },
                      { label: "Category", field: "category" as SortField },
                      { label: "Views", field: "views" as SortField },
                      { label: "Date", field: "createdAt" as SortField },
                    ].map(({ label, field }) => (
                      <th
                        key={field}
                        className="text-left px-5 py-3.5 cursor-pointer select-none"
                        onClick={() => toggleSort(field)}
                      >
                        <span
                          className="flex items-center text-xs font-semibold uppercase tracking-wider"
                          style={{
                            color: "var(--muted-foreground)",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          {label}
                          <SortIcon field={field} />
                        </span>
                      </th>
                    ))}
                    <th className="text-right px-5 py-3.5">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-16 text-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        No videos found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((video, i) => (
                      <tr
                        key={video.id}
                        className="border-b transition-colors hover:opacity-90 group"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <td
                          className="px-5 py-4 text-xs"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {(page - 1) * perPage + i + 1}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={video.thumbnail}
                              alt=""
                              className="w-14 h-9 rounded-lg object-cover flex-shrink-0"
                              style={{ border: "1px solid var(--border)" }}
                            />
                            <div className="min-w-0">
                              <p
                                className="text-sm font-semibold leading-tight line-clamp-1 mb-0.5"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  color: "var(--foreground)",
                                }}
                              >
                                {video.title}
                              </p>
                              <p
                                className="text-xs line-clamp-1"
                                style={{ color: "var(--muted-foreground)" }}
                              >
                                {video.caption}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className="text-xs font-medium px-2 py-0.5 rounded-lg w-fit"
                              style={{
                                background: "rgba(232,255,71,0.08)",
                                color: "var(--primary)",
                              }}
                            >
                              {video.category}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              {video.subcategory}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div
                            className="flex items-center gap-1 text-sm"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            <Eye size={12} />
                            {((video.views || 0) / 1000).toFixed(1)}k
                          </div>
                          {video.duration && (
                            <div
                              className="flex items-center gap-1 text-xs mt-0.5"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              <Clock size={10} />
                              {video.duration}
                            </div>
                          )}
                        </td>
                        <td
                          className="px-5 py-4 text-sm"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {new Date(video.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingVideo(video);
                                setFormMode("edit");
                              }}
                              className="p-2 rounded-lg transition-all hover:opacity-80"
                              style={{
                                border: "1px solid var(--border)",
                                color: "#47c8e8",
                              }}
                              title="Edit"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(video)}
                              className="p-2 rounded-lg transition-all hover:opacity-80"
                              style={{
                                border: "1px solid rgba(255,68,68,0.3)",
                                color: "var(--destructive)",
                              }}
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-between px-5 py-3 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Page {page} of {totalPages} · {filtered.length} results
                </span>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className="w-7 h-7 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background:
                            p === page ? "var(--primary)" : "var(--secondary)",
                          color:
                            p === page ? "black" : "var(--muted-foreground)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side panel form */}
      {isFormOpen && (
        <div
          className="flex flex-col w-full lg:w-1/2 xl:w-2/5 border-l overflow-hidden"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
          }}
        >
          <VideoForm
            mode={formMode!}
            initialData={editingVideo || undefined}
            onSubmit={formMode === "add" ? handleAdd : handleEdit}
            onCancel={() => {
              setFormMode(null);
              setEditingVideo(null);
            }}
          />
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(255,68,68,0.1)" }}
            >
              <AlertTriangle
                size={22}
                style={{ color: "var(--destructive)" }}
              />
            </div>
            <h3
              className="text-center font-bold text-lg mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Delete Video?
            </h3>
            <p
              className="text-center text-sm mb-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              This will permanently delete
            </p>
            <p
              className="text-center text-sm font-semibold mb-6"
              style={{ color: "var(--foreground)" }}
            >
              &ldquo;{deleteTarget.title}&rdquo;
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--destructive)", color: "#fff" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
