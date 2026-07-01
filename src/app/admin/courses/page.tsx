"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/Adminheader";
// import Videoform from "@/components/admin/CourseForm";
import CourseForm from "@/components/admin/CourseForm";
import { Course } from "@/features/course/courseApi";

import { getCourses, deleteCourse } from "@/features/course/courseSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
  Clock,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getErrorMessage } from "@/utils/getErrorMessage";

type SortField = "title" | "category" | "views" | "createdAt";
type SortDir = "asc" | "desc";

export default function AdmincoursesPage() {
  const dispatch = useAppDispatch();

  const { courses, fetchLoading, error } = useAppSelector(
    (state) => state.course,
  );

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ field: SortField; dir: SortDir }>({
    field: "createdAt",
    dir: "desc",
  });
  const [page, setPage] = useState(1);
  const perPage = 6;

  // ── Fetch all videos from API ──────────────────────────────────────────────
  const fetchCourses = useCallback(async () => {
    await dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const filtered = courses
    .filter((v) =>
      [v.title, v.category, v.subcategory, v.caption].some((f) =>
        (f || "").toLowerCase().includes(search.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      if (sort.field === "createdAt")
        return (
          (new Date(a.createdAt ?? "").getTime() -
            new Date(b.createdAt ?? "").getTime()) *
          dir
        );
      return (
        (String(a[sort.field as keyof Course] ?? "") as string).localeCompare(
          String(b[sort.field as keyof Course] ?? "") as string,
        ) * dir
      );
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

  // ── onSuccess from form (add or edit) ─────────────────────────────────────
  const handleFormSuccess = () => {
    fetchCourses();
    setFormMode(null);
    setEditingCourse(null);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteCourse(deleteTarget._id)).unwrap();

      setDeleteTarget(null);

      fetchCourses();
    } catch (err) {
      alert(getErrorMessage(err));
    }
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

  const isFormOpen = formMode !== null;

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Table panel ── */}
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300 "
        style={{ display: isFormOpen ? undefined : "flex" }}
      >
        <AdminHeader
          title="Courses"
          subtitle={
            fetchLoading ? "Loading..." : `${courses.length} total courses`
          }
        />

        <div className="flex-1 overflow-auto p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--muted-foreground)"
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none w-64 border border-(--border) bg-(--card) text-(--foreground)"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Refresh */}
              <button
                onClick={fetchCourses}
                disabled={fetchLoading}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all hover:opacity-80 border border-(--border)  text-(--muted-foreground)"
                title="Refresh"
              >
                <RefreshCw
                  size={14}
                  className={fetchLoading ? "animate-spin" : ""}
                />
              </button>

              {/* Add course */}
              <button
                onClick={() => {
                  setFormMode("add");
                  setEditingCourse(null);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 bg-(--primary) text-(--muted) font-display"
              >
                <Plus size={16} /> Add Course
              </button>
            </div>
          </div>

          {/* Fetch error */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl mb-5 text-sm bg-[rgba(255,68,68,0.08)] border border-(--border) text-[#ff6b6b]">
              <AlertTriangle size={15} />
              <span className="flex-1">{error}</span>
              <button
                onClick={fetchCourses}
                className="font-semibold underline hover:opacity-70"
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div
            className="rounded-2xl overflow-hidden bg-(--card) border border-(--border) "
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-175">
                <thead>
                  <tr className="border-b border-(--border) bg-[rgba(30,32,38,0.5)]">
                    <th className="text-left px-5 py-3.5 w-12">
                      <span className="text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
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
                        <span className="flex items-center text-xs font-semibold uppercase tracking-wider font-display text-(--muted-foreground)">
                          {label}
                          <SortIcon field={field} />
                        </span>
                      </th>
                    ))}
                    <th className="text-right px-5 py-3.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16">
                        <div className="flex flex-col items-center gap-3 text-(--primary)">
                          <Loader2 size={24} className="animate-spin" />
                          <p className="text-sm text-(--muted-foreground)">
                            Loading courses...
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-16 text-sm text-(--muted-foreground)"
                      >
                        {search
                          ? "No courses match your search."
                          : "No courses yet. Add your first one!"}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((course, i) => (
                      <tr
                        key={course._id}
                        className="border-b transition-colors hover:opacity-90 group border-(--border)"
                      >
                        <td className="px-5 py-4 text-xs text-(--muted-foreground)">
                          {(page - 1) * perPage + i + 1}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={course.thumbnail}
                              alt=""
                              className="w-14 h-9 rounded-lg object-cover shrink-0 border border-(--border)"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-tight line-clamp-1 mb-0.5 font-display text-(--foreground)">
                                {course.title}
                              </p>
                              <p className="text-xs line-clamp-1 text-(--muted-foreground)">
                                {course.caption}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-lg w-fit bg-[rgba(232,255,71,0.08)] text-(--primary)">
                              {course.category}
                            </span>
                            <span className="text-xs text-(--muted-foreground)">
                              {course.subcategory}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {/* <div className="flex items-center gap-1 text-sm text-(--muted-foreground)">
                            <Eye size={12} />
                            {((course.views || 0) / 1000).toFixed(1)}k
                          </div> */}
                          {/* {course.duration && (
                            <div className="flex items-center gap-1 text-xs mt-0.5 text-(--muted-foreground)">
                              <Clock size={10} />
                              {course.duration}
                            </div>
                          )} */}
                        </td>
                        <td className="px-5 py-4 text-sm text-(--muted-foreground)">
                          {course.createdAt
                            ? new Date(course.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingCourse(course);
                                setFormMode("edit");
                              }}
                              className="p-2 rounded-lg transition-all hover:opacity-80 border border-(--border) text-(--primary)"
                              title="Edit"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(course)}
                              className="p-2 rounded-lg transition-all hover:opacity-80 border border-(--border) text-(--destructive)"
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
              <div className="flex items-center justify-between px-5 py-3 border-t border-(--border)">
                <span className="text-xs text-(--muted-foreground)">
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

      {/* ── Side panel form ── */}
      {isFormOpen && (
        <div className="flex flex-col border-l overflow-hidden  w-[45%] min-w-120 max-w-160 border border-(--border) bg-(--background)">
          <CourseForm
            mode={formMode!}
            initialData={editingCourse || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setFormMode(null);
              setEditingCourse(null);
            }}
          />
        </div>
      )}

      {/* ── Delete modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl p-6 w-full max-w-sm bg-(--card) border border-(--border)">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[rgba(255,68,68,0.1)]">
              <AlertTriangle size={22} className="text-(--destructive)" />
            </div>
            <h3 className="text-center font-bold text-lg mb-2 font-display">
              Delete Video?
            </h3>
            <p className="text-center text-sm mb-1 text-(--muted-foreground)">
              This will permanently delete
            </p>
            <p className="text-center text-sm font-semibold mb-6 text-(--foreground)">
              &ldquo;{deleteTarget.title}&rdquo;
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-50 border border-(--border) text-(--muted-foreground)"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 bg-(--destructive) text-(--destructive-foreground)"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
