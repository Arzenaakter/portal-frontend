import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if available
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Token helpers (localStorage) ──────────────────────────────────────────────
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
  // Also set a cookie so Next.js middleware can read it server-side
  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
};

export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  // Clear the cookie too
  document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setUser = (user: AuthResponse["user"]): void => {
  localStorage.setItem("auth_user", JSON.stringify(user));
};

export const isAuthenticated = (): boolean => !!getToken();

// ── API calls ─────────────────────────────────────────────────────────────────
export const loginApi = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  console.log("Login response:", response.data);
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Ignore — always clear local state
  } finally {
    removeToken();
  }
};

export const getMeApi = async (): Promise<AuthResponse["user"]> => {
  const response = await apiClient.get<AuthResponse["user"]>("/auth/me");
  return response.data;
};

export default apiClient;

// Register
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export const registerApi = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    credentials,
  );
  console.log("Register response:", response.data);
  return response.data;
};
