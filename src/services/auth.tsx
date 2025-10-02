import axios, { type AxiosResponse } from "axios";

const API_URL = "https://moneywise-api-backend.onrender.com/api";

// -------------------
// Types
// -------------------
export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in?: number;
};

export type User = {
  profileImage: string;
  id: number;
  name: string;
  email: string;
  profile_image: URL;
  created_at?: string;
  updated_at?: string;
};

export type Stats = {
  transactions: number;
  categories: number;
  total: number;
};

// -------------------
// Helpers
// -------------------
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

// -------------------
// API Functions
// -------------------

// Connexion
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
}

// Déconnexion
export async function logout(): Promise<{ message: string }> {
  const res: AxiosResponse<{ message: string }> = await axios.post(
    `${API_URL}/logout`,
    {},
    { headers: getAuthHeaders() }
  );
  localStorage.removeItem("token");
  return res.data;
}

// Profil utilisateur
export async function getUserProfile(): Promise<User> {
  const res: AxiosResponse<User> = await axios.get(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Mise à jour du profil utilisateur
export async function updateUserProfile(formData: FormData): Promise<User> {
  const res: AxiosResponse<{ success: boolean; user: User }> = await axios.post(
    `${API_URL}/update-profile`,
    formData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data.user;
}

