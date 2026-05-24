import VideoPlayer from "@/components/shared/VideoPlayer";
import { api } from "@/services/api";

async function getVideo(documentId: string) {
  const res = await api.get(`/api/videos/${documentId}?populate=*`);
  return res.data.data;
}

export default async function VideoPage({
  params,
}: {
  params: { documentId: string };
}) {
  const { documentId } = await params;
  const video = await getVideo(documentId);

  return (
    <div className="container py-10">
      <VideoPlayer
        src={video.videoUrl}
        // poster={`${process.env.NEXT_PUBLIC_API_URL}${video.thumbnail?.url}`}
      />

      <h1 className="text-3xl font-bold mt-6">{video.title}</h1>
      <div className="mt-4">{video.description}</div>
    </div>
  );
}
