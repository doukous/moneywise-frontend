import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Helper pour récupérer le token
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

// Connexion
export async function login(email, password) {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
}

// Déconnexion
export async function logout() {
  const res = await axios.post(
    `${API_URL}/logout`,
    {},
    { headers: getAuthHeaders() }
  );
  localStorage.removeItem("token");
  return res.data;
}

// Profil utilisateur
export async function getUserProfile() {
  const res = await axios.get(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Mise à jour du profil utilisateur ( backend doit avoir une route PUT /me)
export async function updateUserProfile(formData) {
  const res = await axios.put(`${API_URL}/me`, formData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Statistiques globales
export async function getUserStats() {
  const res = await axios.get(`${API_URL}/stats/monthly`, {
    headers: getAuthHeaders(),
  });
  return res.data; 
}
