const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/logout"; 
//  En production, change par ton domaine déployé

export async function logoutUser() {
  const token = localStorage.getItem("token"); // récupère le JWT

  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // on envoie le JWT au back
    }
  });

  if (response.ok) {
    localStorage.removeItem("token"); // on supprime le JWT
    return true;
  } else {
    throw new Error("Échec de la déconnexion");
  }
}
