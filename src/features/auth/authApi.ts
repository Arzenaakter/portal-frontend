import axiosInstance from "@/services/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

// Register
export const registerApi = async (data: RegisterPayload) => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    data,
  );

  return response.data;
};

// Login
export const loginApi = async (data: LoginPayload) => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login", data);

  return response.data;
};

// Get Current User
export const getMeApi = async () => {
  const response = await axiosInstance.get<User>("/auth/me");

  return response.data;
};
