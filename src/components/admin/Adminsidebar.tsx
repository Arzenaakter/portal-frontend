"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { logoutApi } from "@/lib/auth";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", badge: null },
  { label: "Videos", icon: Video, href: "/admin/videos", badge: "8" },

  { label: "Users", icon: Users, href: "/admin/users", badge: null },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/admin/analytics",
    badge: null,
  },
];

// const bottomItems = [
//   { label: "Notifications", icon: Bell, href: "/admin/notifications" },
//   { label: "Settings", icon: Settings, href: "/admin/settings" },
// ];

export default function Adminsidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const [userEmail, setUserEmail] = useState("admin@learnhub.com");
  const [userInitial, setUserInitial] = useState("A");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.name) {
          setUserName(parsed.name);
          setUserInitial(parsed.name[0].toUpperCase());
        }
        if (parsed?.email) setUserEmail(parsed.email);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const handleLogout = async () => {
    await logoutApi();
    router.push("/login");
  };

  const width = collapsed ? 64 : 240;

  return (
    <aside
      style={{
        width,
        minWidth: width,
        maxWidth: width,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        background: "var(--card)",
        borderRight: "1px solid var(--border)",
        transition: "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease",
        overflow: "hidden",
        position: "sticky",
        top: 0,
      }}
    >
      {/* ── Logo row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: 64,
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}
      >
        {!collapsed ? (
          <>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Zap size={14} fill="black" color="black" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--foreground)",
                  whiteSpace: "nowrap",
                }}
              >
                Learn<span style={{ color: "var(--primary)" }}>Hub</span>
              </span>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "var(--muted-foreground)",
                display: "flex",
              }}
            >
              <ChevronLeft size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "var(--primary)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Zap size={14} fill="black" color="black" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            margin: "12px auto 0",
            width: 32,
            height: 32,
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted-foreground)",
          }}
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Section label */}
      {!collapsed && (
        <div style={{ padding: "20px 16px 8px" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#3a3d45",
              fontFamily: "var(--font-display)",
              margin: 0,
            }}
          >
            Menu
          </p>
        </div>
      )}

      {/* ── Main nav ── */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "4px 8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map(({ label, icon: Icon, href, badge }) => {
            const isActive =
              pathname === href ||
              (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 12,
                  textDecoration: "none",
                  position: "relative",
                  background: isActive ? "rgba(232,255,71,0.1)" : "transparent",
                  color: isActive
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
                  border: isActive
                    ? "1px solid rgba(232,255,71,0.15)"
                    : "1px solid transparent",
                  transition: "opacity 0.15s",
                }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        flex: 1,
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {label}
                    </span>
                    {badge && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 999,
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
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      borderRadius: 999,
                      fontSize: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--primary)",
                      color: "black",
                    }}
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
      <div
        style={{ height: 1, background: "var(--border)", margin: "4px 12px" }}
      />

      {/* ── Bottom nav ── */}
      <div
        style={{
          padding: "4px 8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* {bottomItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 12,
              textDecoration: "none",
              color: "var(--muted-foreground)",
            }}
          >
            <Icon size={17} style={{ flexShrink: 0 }} />
            {!collapsed && (
              <span
                style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}
              >
                {label}
              </span>
            )}
          </Link>
        ))} */}

        {/* User row / Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 12px",
            borderRadius: 12,
            marginTop: 4,
            border: "1px solid var(--border)",
            background: "none",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "var(--primary)",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {userInitial}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    margin: 0,
                    color: "var(--foreground)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userName}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    margin: 0,
                    color: "var(--muted-foreground)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userEmail}
                </p>
              </div>
              <LogOut
                size={14}
                style={{ color: "var(--muted-foreground)", flexShrink: 0 }}
              />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
