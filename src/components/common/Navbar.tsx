"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Zap } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { Button } from "../ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Categories", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#1e2026] bg-[rgba(8,9,10,0.85)]">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />
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
              <Button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg transition-colors hover:opacity-80 text-(--muted-foreground)"
              >
                <Search size={18} />
              </Button>
            )}

            <Link
              href="/admin"
              className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90 active:scale-95 bg-(--primary) text-(--primary-foreground)  font-sans"
            >
              Admin
            </Link>

            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-(--muted-foreground)"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 pb-4 pt-2 border-[#1e2026] bg-[rgba(8,9,10,0.98)]">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block py-3 text-sm border-b border-[#1e2026] text-(--muted-foreground) "
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="mt-3 flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-xl bg-(--primary) text-(--primary-foreground)"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
