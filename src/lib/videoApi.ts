import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Log errors
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        message: error.response.data,
      });
    }
    return Promise.reject(error);
  },
);

export interface VideoPayload {
  title: string;
  caption: string;
  description: string;
  videoUrl: string;
  category: string;
  subcategory: string;
  thumbnail: string; // URL string — backend model expects String
}

// Upload image file to imgbb (free, no account needed for basic use)
// Returns a public image URL
export const uploadImageToImgbb = async (file: File): Promise<string> => {
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

  if (!IMGBB_API_KEY) {
    throw new Error(
      "IMGBB_API_KEY is not set. Add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file. " +
        "Get a free key at https://api.imgbb.com",
    );
  }

  const form = new FormData();
  form.append("image", file);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    form,
  );

  if (!res.data?.data?.url) {
    throw new Error("Image upload failed — no URL returned.");
  }

  return res.data.data.url as string;
};

// ── Create — POST /videos with JSON body ──────────────────────────────────────
export const createVideoApi = async (data: VideoPayload) => {
  const res = await apiClient.post("/videos", data);
  return res.data;
};

// ── Update — PUT /videos/:id with JSON body ───────────────────────────────────
export const updateVideoApi = async (
  id: string,
  data: Partial<VideoPayload>,
) => {
  const res = await apiClient.put(`/videos/${id}`, data);
  return res.data;
};

// ── Delete ─────────────────────────────────────────────────────────────────────
export const deleteVideoApi = async (id: string) => {
  const res = await apiClient.delete(`/videos/${id}`);
  return res.data;
};

// ── Get all ────────────────────────────────────────────────────────────────────
export const getVideosApi = async () => {
  const res = await apiClient.get("/videos");
  return res.data;
};
