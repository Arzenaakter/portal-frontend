"use client";

import { Bell, Search, Home } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function Adminheader({ title, subtitle }: AdminHeaderProps) {
  return (
    <div
      className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div>
        <h1
          className="text-lg font-bold leading-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--foreground)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
          style={{
            background: "var(--secondary)",
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          <Search size={13} />
          <span>Quick search...</span>
          <kbd
            className="px-1.5 py-0.5 rounded text-xs"
            style={{ background: "var(--border)" }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl transition-colors hover:opacity-70"
          style={{
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <Bell size={16} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </button>

        {/* Go to site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
          style={{
            background: "var(--secondary)",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <Home size={13} />
          View Site
        </Link>
      </div>
    </div>
  );
}
