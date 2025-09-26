// src/components/LogoutButton.jsx
import React from "react";
import { logoutUser } from "../services/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/login"; // Redirection vers login
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
