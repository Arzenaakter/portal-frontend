"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Users,
  BarChart2,
  Settings,
  Tag,
  MessageSquare,
  Bell,
  ChevronLeft,
  Zap,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", badge: null },
  { label: "Videos", icon: Video, href: "/admin/videos", badge: "8" },
  { label: "Categories", icon: Tag, href: "/admin/categories", badge: null },
  { label: "Users", icon: Users, href: "/admin/users", badge: null },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/admin/analytics",
    badge: null,
  },
  {
    label: "Comments",
    icon: MessageSquare,
    href: "/admin/comments",
    badge: "3",
  },
];

const bottomItems = [
  { label: "Notifications", icon: Bell, href: "/admin/notifications" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Adminsidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300"
      style={{
        width: collapsed ? 64 : 240,
        background: "var(--card)",
        borderRight: "1px solid var(--border)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-between px-4 h-16 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <Zap size={14} fill="black" style={{ color: "black" }} />
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Learn<span style={{ color: "var(--primary)" }}>Hub</span>
            </span>
          </Link>
        )}
        {collapsed && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto"
            style={{ background: "var(--primary)" }}
          >
            <Zap size={14} fill="black" style={{ color: "black" }} />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg transition-colors hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mt-2 mx-2 p-2 rounded-xl flex items-center justify-center transition-colors hover:opacity-70"
          style={{
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <ChevronLeft size={14} style={{ transform: "rotate(180deg)" }} />
        </button>
      )}

      {/* Nav label */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#3a3d45", fontFamily: "var(--font-display)" }}
          >
            Menu
          </p>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, href, badge }) => {
            const isActive =
              pathname === href ||
              (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative"
                style={{
                  background: isActive ? "rgba(232,255,71,0.1)" : "transparent",
                  color: isActive
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
                  border: isActive
                    ? "1px solid rgba(232,255,71,0.15)"
                    : "1px solid transparent",
                }}
                title={collapsed ? label : undefined}
              >
                <Icon size={17} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span
                      className="text-sm font-medium flex-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {label}
                    </span>
                    {badge && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(232,255,71,0.15)",
                          color: "var(--primary)",
                        }}
                      >
                        {badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && badge && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center"
                    style={{ background: "var(--primary)", color: "black" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Divider */}
      <div className="mx-3 my-2 h-px" style={{ background: "var(--border)" }} />

      {/* Bottom nav */}
      <div className="px-2 pb-3 flex flex-col gap-1">
        {bottomItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:opacity-80"
            style={{ color: "var(--muted-foreground)" }}
            title={collapsed ? label : undefined}
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{label}</span>}
          </Link>
        ))}

        {/* User */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:opacity-80 transition-opacity mt-1"
          style={{ border: "1px solid var(--border)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
            style={{ background: "var(--primary)", color: "black" }}
          >
            A
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  Admin
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  admin@learnhub.com
                </p>
              </div>
              <LogOut
                size={14}
                style={{ color: "var(--muted-foreground)", flexShrink: 0 }}
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
