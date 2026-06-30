import Container from "@/components/common/Container";
import { MOCK_VIDEOS } from "@/types";
import { CalendarDays, Clock3, Eye, Tag } from "lucide-react";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CourseDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const course = MOCK_VIDEOS.find((item) => item._id === id);

  if (!course) {
    return <h1>Course not found</h1>;
  }

  return (
    <Container>
      <div className="  px-4 text-(--foreground) ">
        {/* Hero */}
        <div className="relative overflow-hidden ">
          <div className="  py-10 relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-block rounded-full bg-(--primary)/10 text-(--primary) px-4 py-1 text-sm">
                {course.category}
              </span>

              <h1 className="text-5xl font-bold mt-5 leading-tight">
                {course.title}
              </h1>

              <p className="text-(--muted-foreground) mt-5 text-lg">
                {course.caption}
              </p>

              <div className="flex flex-wrap gap-6 mt-8 text-(--muted-foreground)">
                <div className="flex items-center gap-2">
                  <Clock3 className="w-5 h-5 text-cyan-400" />
                  {course.duration}
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  {course.views?.toLocaleString() ?? "0"} views
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-cyan-400" />
                  {course.createdAt}
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-cyan-400" />
                  {course.subcategory}
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={900}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="  py-10">
          <h2 className="text-3xl font-bold mb-8">About this Course</h2>

          <div
            className="prose prose-invert max-w-none prose-p:text-(--muted-foreground)"
            dangerouslySetInnerHTML={{
              __html: course.description,
            }}
          />
        </div>

        {/* Video */}
        <div className="   pb-24">
          <h2 className="text-3xl font-bold mb-8">Course Preview</h2>

          <div className="overflow-hidden rounded-2xl aspect-video border border-white/10">
            <iframe
              className="w-full h-full"
              src={course.videoUrl.replace("watch?v=", "embed/")}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CourseDetailsPage;
