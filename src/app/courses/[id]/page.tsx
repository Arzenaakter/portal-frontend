import { MOCK_VIDEOS } from "@/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CourseDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const course = MOCK_VIDEOS.find((item) => item._id === id);
  console.log("Course ID:", id);

  if (!course) {
    return <h1>Course not found</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto py-28 px-4">
      <h1>{course.title}</h1>
      <p>{course._id}</p>
    </div>
  );
};

export default CourseDetailsPage;
