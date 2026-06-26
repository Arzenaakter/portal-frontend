import Videocard from "@/components/home/Videocard";
import { MOCK_VIDEOS } from "@/types";

const page = () => {
  return (
    <section className="py-28 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MOCK_VIDEOS.map((video, i) => (
            <div
              key={video._id}
              style={{
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
                animation: `fadeUp 0.4s ease ${i * 0.05}s forwards`,
              }}
            >
              <Videocard video={video} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
