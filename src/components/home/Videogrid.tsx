"use client";

import { useState } from "react";
import { Video } from "@/types";
import VideoCard from "./Videocard";
import CategoryFilter from "./Categoryfilter";
import { Layers } from "lucide-react";

interface VideoGridProps {
  videos: Video[];
  title: string;
  showFilter?: boolean;
}

export default function Videogrid({
  videos,
  title,
  showFilter = false,
}: VideoGridProps) {
  const [filtered, setFiltered] = useState(videos);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFiltered(videos);
    } else {
      setFiltered(videos.filter((v) => v.category === category));
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(232,255,71,0.1)" }}
            >
              <Layers size={16} style={{ color: "var(--primary)" }} />
            </div>
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              {title}
            </h2>
          </div>
          <button
            className="text-xs font-semibold transition-colors hover:opacity-80"
            style={{
              color: "var(--primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            View All →
          </button>
        </div>

        {showFilter && (
          <div className="mb-8">
            <CategoryFilter onFilterChange={handleFilter} />
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: "var(--muted-foreground)" }}>
              No videos in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((video, i) => (
              <div
                key={video._id}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0,
                  animation: `fadeUp 0.4s ease ${i * 0.05}s forwards`,
                }}
              >
                <VideoCard video={video} featured />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
