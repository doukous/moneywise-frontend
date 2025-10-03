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
  id: number;
  name: string;
  email: string;
  profile_image?: string; // ✅ utilise celui du backend
  profile_image_url?: string; // Ajouté car le backend le renvoie dans 'me()' et 'updateProfile'
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
/**
 * Récupère le jeton d'authentification pour les en-têtes.
 * Retourne un objet vide si le jeton est absent pour éviter l'envoi de 'Bearer null'.
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
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
  // L'appel partira sans en-tête d'Authorization si le token n'est pas là
  const res: AxiosResponse<{ success: boolean; user: User }> = await axios.get(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });
  return res.data.user; // Le backend retourne { success: true, user: User }
}

// Mise à jour du profil utilisateur
export async function updateUserProfile(formData: FormData): Promise<User> {
  const res: AxiosResponse<{ success: boolean; user: User; message: string }> = await axios.post(
    `${API_URL}/update-profile`,
    formData,
    {
      headers: {
        ...getAuthHeaders(), // Ajoute l'Authorization s'il existe
        // 'Content-Type' n'est généralement pas nécessaire avec FormData, Axios le gère,
        // mais le laisser ne nuit pas. L'en-tête correct est 'multipart/form-data'.
        // On le laisse pour la compatibilité avec votre code original si besoin.
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data.user;
}