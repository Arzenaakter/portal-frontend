import { MOCK_VIDEOS } from "@/types";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import LatestVideosSection from "@/components/home/Latestvideossection";
import VideoGrid from "@/components/home/Videogrid";

export default function HomePage() {
  // In production, fetch from your backend API
  const videos = MOCK_VIDEOS;
  const featuredVideo = videos[0];

  return (
    <main>
      {/* Hero */}
      <Hero featuredVideo={featuredVideo} />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border), transparent)",
          }}
        />
      </div>

      {/* Latest Released Section */}
      <LatestVideosSection videos={videos} />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border), transparent)",
          }}
        />
      </div>

      {/* All Courses grid with filter */}
      <VideoGrid videos={videos} title="All Courses" showFilter />

      {/* Footer */}
      <footer
        className="border-t mt-16 py-12 px-4"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="black">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Learn<span style={{ color: "var(--primary)" }}>Hub</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
