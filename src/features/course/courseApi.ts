import axiosInstance from "@/services/axios";

export interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  caption: string;
  description: string;
  videoUrl: string;
  category: string;
  subcategory: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CoursePayload {
  title: string;
  thumbnail: string;
  caption: string;
  description: string;
  videoUrl: string;
  category: string;
  subcategory: string;
}

// Get All Courses
export const getCoursesApi = async () => {
  const response = await axiosInstance.get<Course[]>("/videos");

  return response.data;
};

// Get Single Course
export const getCourseApi = async (id: string) => {
  const response = await axiosInstance.get<Course>(`/videos/${id}`);

  return response.data;
};

// Create Course
export const createCourseApi = async (data: CoursePayload) => {
  const response = await axiosInstance.post<Course>("/videos", data);

  return response.data;
};

// Update Course
export const updateCourseApi = async (
  id: string,
  data: Partial<CoursePayload>,
) => {
  const response = await axiosInstance.put<Course>(`/videos/${id}`, data);

  return response.data;
};

// Delete Course
export const deleteCourseApi = async (id: string) => {
  const response = await axiosInstance.delete(`/videos/${id}`);

  return response.data;
};
