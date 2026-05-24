"use client";

import { useState } from "react";
import { CATEGORIES } from "@/types";

interface CategoryFilterProps {
  onFilterChange: (category: string) => void;
}

export default function Categoryfilter({
  onFilterChange,
}: CategoryFilterProps) {
  const [active, setActive] = useState("All");

  const handleClick = (name: string) => {
    setActive(name);
    onFilterChange(name);
  };

  const allCategories = ["All", ...CATEGORIES.map((c) => c.name)];

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
    >
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            background: active === cat ? "var(--primary)" : "var(--secondary)",
            color:
              active === cat
                ? "var(--primary-foreground)"
                : "var(--muted-foreground)",
            border: `1px solid ${active === cat ? "transparent" : "var(--border)"}`,
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
