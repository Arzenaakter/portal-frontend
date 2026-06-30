import { MOCK_VIDEOS } from "@/types";
import Hero from "@/components/home/Hero";
import LatestVideosSection from "@/components/home/Latestvideossection";
import VideoGrid from "@/components/home/Videogrid";
import Divider from "@/components/common/Divider";

export default function HomePage() {
  const videos = MOCK_VIDEOS;
  const featuredVideo = videos[0];

  return (
    <main>
      {/* Hero */}
      <Hero featuredVideo={featuredVideo} />

      {/* Divider */}
      <Divider />

      {/* Latest Released Section */}
      <LatestVideosSection videos={videos} />

      {/* Divider */}
      <Divider />
      {/* All Courses grid with filter */}
      <VideoGrid videos={videos} title="All Courses" showFilter />

      {/* Footer */}
    </main>
  );
}
