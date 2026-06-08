"use client";

import Adminsidebar from "@/components/admin/Adminsidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        // overflow: "hidden",
        background: "var(--background)",
      }}
    >
      <Adminsidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // overflow: "hidden",
          minWidth: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
