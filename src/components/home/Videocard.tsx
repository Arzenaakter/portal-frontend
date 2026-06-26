"use client";

import { Video } from "@/types";
import { Play, Clock, Eye, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  video: Video;
  featured?: boolean;
}

export const formatViews = (views?: number) => {
  if (!views) return "0";
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
};

export default function Videocard({ video, featured = false }: VideoCardProps) {
  if (featured) {
    return (
      <Link href={`/courses/${video._id}`}>
        <div
          className="relative group cursor-pointer card-hover rounded-2xl overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Duration badge */}
            {video.duration && (
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Clock size={10} />
                {video.duration}
              </div>
            )}

            {/* Category badge */}
            <div
              className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontFamily: "var(--font-display)",
              }}
            >
              {video.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p
              className="text-xs font-medium mb-2"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              {video.subcategory}
            </p>
            <h3
              className="font-bold text-base leading-tight mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              {video.title}
            </h3>
            <p
              className="text-xs line-clamp-2 mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              {video.caption}
            </p>

            <div
              className="flex items-center justify-between text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              <div className="flex items-center gap-1">
                <Eye size={12} />
                <span>{formatViews(video.views)} views</span>
              </div>
              <span>
                {new Date(video.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Compact horizontal card
  return (
    <Link href={`/courses/${video._id}`}>
      <div
        className="flex gap-3 group cursor-pointer p-3 rounded-xl transition-all hover:opacity-90"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <Play
                size={12}
                fill="black"
                style={{ color: "black", marginLeft: 1 }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-medium mb-1"
            style={{ color: "var(--primary)" }}
          >
            {video.subcategory}
          </p>
          <h4
            className="text-xs font-semibold leading-tight line-clamp-2 mb-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--foreground)",
            }}
          >
            {video.title}
          </h4>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            {video.duration && (
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {video.duration}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {formatViews(video.views)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
