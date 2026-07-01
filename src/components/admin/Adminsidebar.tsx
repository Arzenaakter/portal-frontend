"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Users,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/features/auth/authSlice";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", badge: null },
  { label: "Courses", icon: Video, href: "/admin/courses", badge: "8" },

  { label: "Users", icon: Users, href: "/admin/users", badge: null },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/admin/analytics",
    badge: null,
  },
];

export default function Adminsidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const userName = user?.name ?? "Admin";
  const userEmail = user?.email ?? "admin@learnhub.com";
  const userInitial = user?.name?.charAt(0).toUpperCase() ?? "A";

  const handleLogout = () => {
    dispatch(logout());

    router.replace("/login");
  };

  const width = collapsed ? 64 : 240;

  return (
    <aside
      className="sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden border-r border-(--border) bg-(--card)"
      style={{
        width,
        minWidth: width,
        maxWidth: width,
        transition: "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease",
      }}
    >
      {/* ── Logo row ── */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
        {!collapsed ? (
          <>
            <Link className="flex items-center gap-2 no-underline" href="/">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--primary) shrink-0">
                <Zap size={14} fill="black" color="black" />
              </div>
              <span className="font-display text-sm font-bold whitespace-nowrap text-(--foreground)">
                Learn
                <span className="text-(--primary)">Hub</span>
              </span>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              className="flex cursor-pointer border-0 bg-transparent p-1 text-(--muted-foreground)"
            >
              <ChevronLeft size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-0 bg-(--primary)"
          >
            <Zap size={14} fill="black" color="black" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border border-(--border) bg-transparent text-(--muted-foreground)"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Section label */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <p className="m-0 font-display text-[11px] font-semibold uppercase tracking-widest text-[#3a3d45]">
            Menu
          </p>
        </div>
      )}

      {/* ── Main nav ── */}
      <nav className="flex-1 overflow-y-auto p-1">
        <div className="flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, href, badge }) => {
            const isActive =
              pathname === href ||
              (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`
                  relative flex items-center gap-3 rounded-xl px-3 py-2.5
                  no-underline transition-opacity duration-150
                  ${
                    isActive
                      ? "border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.1)] text-(--primary)"
                      : " bg-transparent text-(--muted-foreground)"
                  }
                 `}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span className="flex-1 whitespace-nowrap font-body text-sm font-medium">
                      {label}
                    </span>
                    {/* {badge && (
                      <span className="rounded-full bg-[rgba(232,255,71,0.15)] px-2 py-0.5 text-[11px] font-bold text-(--primary)">
                        {badge}
                      </span>
                    )} */}
                  </>
                )}
                {/* {collapsed && badge && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--primary) text-[10px] text-(--muted)">
                    {badge}
                  </span>
                )} */}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Divider */}
      <div className="mx-3 my-1 h-px bg-(--border)" />

      {/* ── Bottom nav ── */}
      <div className="flex flex-col gap-1 px-2 pt-1 pb-3">
        {/* User row / Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-(--border) bg-transparent px-3 py-2.5 text-left"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--primary) text-xs font-bold text-(--muted)">
            {userInitial}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0 text-left">
                <p className="m-0 truncate text-xs font-semibold text-(--foreground)">
                  {userName}
                </p>
                <p className="m-0 truncate text-[11px] text-(--muted-foreground)">
                  {userEmail}
                </p>
              </div>
              <LogOut
                size={14}
                className="text-(--muted-foreground) shrink-0"
              />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
