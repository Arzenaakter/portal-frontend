"use client";

import { Bell, Search, Home } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function Adminheader({ title, subtitle }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between h-16 px-6 border-b shrink-0 bg-(--card) border border-(--border)">
      <div>
        <h1 className="text-lg font-bold leading-none font-display text-(--foreground)">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5 text-(--muted-foreground)">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs bg-(--secondary) border border-(--border) text-(--muted-foreground) ">
          <Search size={13} />
          <span>Quick search...</span>
          <kbd className="px-1.5 py-0.5 rounded text-xs border border-(--border) ">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl transition-colors hover:opacity-70 text-(--muted-foreground) border border-(--border)">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full text-(--primary)" />
        </button>

        {/* Go to site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 bg-(--secondary) border border-(--border) text-(--muted-foreground)"
        >
          <Home size={13} />
          View Site
        </Link>
      </div>
    </div>
  );
}
