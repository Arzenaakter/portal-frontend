"use client";

import { Video } from "@/types";
import { Flame } from "lucide-react";
import VideoCard from "./Videocard";

interface LatestVideosSectionProps {
  videos: Video[];
}

export default function LatestVideosSection({
  videos,
}: LatestVideosSectionProps) {
  const latest = [...videos]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main - latest big card */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,100,50,0.1)" }}
              >
                <Flame size={16} style={{ color: "#ff6432" }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                }}
              >
                Latest Released
              </h2>
            </div>

            {latest[0] && (
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer group mb-4"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="relative h-64 sm:h-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latest[0].thumbnail}
                    alt={latest[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-semibold mb-3"
                      style={{
                        background: "rgba(255,100,50,0.15)",
                        color: "#ff6432",
                        border: "1px solid rgba(255,100,50,0.3)",
                      }}
                    >
                      <Flame size={10} />
                      New Release
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#fff",
                      }}
                    >
                      {latest[0].title}
                    </h3>
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {latest[0].caption}
                    </p>
                    <div
                      className="flex items-center gap-3 mt-3 text-xs"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      <span>{latest[0].category}</span>
                      <span>·</span>
                      <span>{latest[0].duration}</span>
                      <span>·</span>
                      <span>
                        {new Date(latest[0].createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - recent list */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                }}
              >
                Recent Videos
              </h3>
              <button
                className="text-xs font-semibold"
                style={{ color: "var(--primary)" }}
              >
                See all →
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {latest.slice(1).map((video) => (
                <VideoCard key={video._id} video={video} featured={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
