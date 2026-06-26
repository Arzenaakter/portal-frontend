"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Categories", href: "#" },
    { label: "Instructors", href: "#" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{ background: "rgba(8,9,10,0.85)", borderColor: "#1e2026" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: "var(--primary)" }}
            >
              <Zap
                size={16}
                style={{ color: "var(--background)" }}
                fill="currentColor"
              />
            </div>
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              Learn<span style={{ color: "var(--primary)" }}>Hub</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2 border"
                style={{
                  background: "var(--input)",
                  borderColor: "var(--border)",
                }}
              >
                <Search
                  size={14}
                  style={{ color: "var(--muted-foreground)" }}
                />
                <input
                  autoFocus
                  placeholder="Search courses..."
                  className="bg-transparent outline-none text-sm w-48"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-body)",
                  }}
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Search size={18} />
              </button>
            )}

            <Link
              href="/admin"
              className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontFamily: "var(--font-display)",
              }}
            >
              Admin
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 pb-4 pt-2"
          style={{ background: "rgba(8,9,10,0.98)", borderColor: "#1e2026" }}
        >
          {["Courses", "Categories", "Instructors", "Pricing"].map((item) => (
            <Link
              key={item}
              href="#"
              className="block py-3 text-sm border-b"
              style={{
                color: "var(--muted-foreground)",
                borderColor: "#1e2026",
              }}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/admin"
            className="mt-3 flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-xl"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
