import axios from "axios";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userDetails = localStorage.getItem("user");
      if (userDetails) {
        const token = JSON.parse(userDetails).token;
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.clear();
        window.location.pathname = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (data: LoginCredentials) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data: RegisterCredentials) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const sendFriendInvitation = async (data: {
  targetMailAddress: string;
}) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data: { id: string }) => {
  try {
    return await apiClient.post("/friend-invitation/accept", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data: { id: string }) => {
  try {
    return await apiClient.post("/friend-invitation/reject", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
