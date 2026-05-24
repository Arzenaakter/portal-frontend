"use client";

import { Video } from "@/types";
import { Play, Clock, Eye, ChevronRight } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  featuredVideo: Video;
}

export default function Hero({ featuredVideo }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,255,71,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "rgba(232,255,71,0.1)",
                color: "var(--primary)",
                border: "1px solid rgba(232,255,71,0.2)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--primary)" }}
              />
              Featured Course
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              Level up your
              <span className="block gradient-text">dev skills.</span>
            </h1>

            <p
              className="text-base mb-8 leading-relaxed max-w-md"
              style={{ color: "var(--muted-foreground)" }}
            >
              Expert-crafted courses for developers and designers. Learn at your
              pace with real projects and hands-on challenges.
            </p>

            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <Play size={16} fill="black" />
                Start Learning
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-80"
                style={{
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Browse All
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10">
              {[
                ["500+", "Courses"],
                ["50k+", "Students"],
                ["4.9", "Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--primary)",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured video preview */}
          <div className="relative animate-fade-up-delay-2">
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                border: "1px solid rgba(232,255,71,0.15)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="relative aspect-video">
                <Image
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--primary)",
                      boxShadow: "0 0 40px rgba(232,255,71,0.4)",
                    }}
                  >
                    <Play
                      size={30}
                      fill="black"
                      style={{ color: "black", marginLeft: 4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Info bar */}
              <div className="p-4" style={{ background: "var(--card)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(232,255,71,0.1)",
                          color: "var(--primary)",
                        }}
                      >
                        {featuredVideo.category}
                      </span>
                    </div>
                    <h3
                      className="text-sm font-bold leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {featuredVideo.title}
                    </h3>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {featuredVideo.caption}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className="flex items-center gap-1 text-xs mb-1"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <Clock size={10} />
                      {featuredVideo.duration}
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <Eye size={10} />
                      {((featuredVideo.views || 0) / 1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
              style={{
                background: "rgba(232,255,71,0.05)",
                border: "1px solid rgba(232,255,71,0.1)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
