import React, { useState, useEffect, type FormEvent } from "react";
import { Edit, Save, X, Upload, CheckCircle } from "lucide-react";
import { updateUserProfile, type User } from "../services/auth"; // fonctions API + type utilisateur
import { useLoaderData } from "react-router";
import SideBar from "../components/SideBar";

const Profile: React.FC = () => {
  // =============================
  // États principaux du composant
  // =============================

  // Stocke les infos de l'utilisateur (récupérées via loaderData ou API)
  const [user, setUser] = useState<User | null>(null);

  // Active/désactive le mode édition du profil
  const [isEditing, setIsEditing] = useState(false);

  // Fichier réel (image uploadée par l’utilisateur)
  const [profileFile, setProfileFile] = useState<File | null>(null);

  // Message de succès affiché après mise à jour
  const [successMessage, setSuccessMessage] = useState("");

  // Formulaire en local (valeurs affichées dans les champs)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "", // URL de l’image (preview base64 ou lien backend)
  });

  // Données injectées par react-router (via loader)
  const loaderData = useLoaderData();

  // ===================================================
  // Fonction utilitaire pour extraire la photo de profil
  // ===================================================
  const extractProfileImage = (u: unknown): string => {
    if (!u) return "";
    const obj = u as Record<string, unknown>;
    const val = obj["profileImage"] ?? obj["profile_image"] ?? "";
    return typeof val === "string" ? val : "";
  };

  // ==================================================
  // Charger les données de l’utilisateur dans le state
  // ==================================================
  useEffect(() => {
    const maybeUser = loaderData as User | null;
    if (maybeUser) {
      setUser(maybeUser);
      setFormData({
        name: maybeUser.name || "",
        email: maybeUser.email || "",
        password: "",
        profileImage: extractProfileImage(loaderData), // soit base64, soit URL
      });
    }
  }, [loaderData]);

  // ================================
  // Gestion de la soumission du form
  // ================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de page par défaut

    try {
      // Création d’un FormData → obligatoire pour envoyer fichiers + champs
      const data = new FormData();
      if (formData.name) data.append("name", formData.name);
      if (formData.email) data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (profileFile) data.append("profile_image", profileFile);

      // Requête backend : POST /api/update-profile
      const updatedUser = await updateUserProfile(data);

      // On met à jour le state local avec la réponse du backend
      setUser(updatedUser);
      setIsEditing(false); // on sort du mode édition

      // Afficher un message de confirmation temporaire
      setSuccessMessage("Profil mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 4000); // disparaît après 4s
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  // ===============================
  // Annuler les modifications locales
  // ===============================
  const handleCancel = () => {
    if (user) {
      // On restaure les données originales
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        profileImage: user.profileImage || "",
      });
      setProfileFile(null); // on supprime le fichier temporaire
    }
    setIsEditing(false); // retour en mode lecture
  };

  // =====================================
  // Gestion du changement de photo profil
  // =====================================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file); // on garde le fichier réel pour upload

      // On lit le fichier localement pour afficher une preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string, // preview (base64)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ================================
  // Affichage pendant le chargement
  // ================================
  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-base-content">
          Chargement du profil...
        </h1>
      </div>
    );
  }

  // ===================
  // Rendu du composant
  // ===================
  return (
    <div className="w-full min-h-screen bg-base-100 flex flex-col sm:flex-row">
      {/* Sidebar de navigation */}
      <SideBar />

      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* HEADER : nom et avatar mini */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-base-content">
                Paramètres
              </h1>
              <p className="text-sm text-base-content/60">
                Gérez vos informations personnelles
              </p>
            </div>

            <div className="flex items-center gap-3">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profil"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {(user.name ?? "U")[0]}
                </div>
              )}
              <span className="font-medium text-base-content">
                {formData.name}
              </span>
            </div>
          </div>

          {/* MESSAGE SUCCÈS */}
          {successMessage && (
            <div className="alert alert-success flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* BLOC PRINCIPAL : Infos personnelles */}
          <div className="bg-base-200 rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-base-content">
                Informations personnelles
              </h2>

              {/* Bouton modifier visible uniquement en mode lecture */}
              {!isEditing && (
                <button
                  className="btn btn-sm btn-ghost text-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Modifier
                </button>
              )}
            </div>

            {/* PHOTO DE PROFIL */}
            <div className="flex items-center space-x-6">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profil"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.name?.[0]}
                </div>
              )}

              {/* Input file visible uniquement en mode édition */}
              {isEditing && (
                <label className="cursor-pointer text-primary flex items-center gap-2 hover:underline">
                  <Upload className="w-4 h-4" />
                  Changer la photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* FORMULAIRE */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              {/* Champ Nom */}
              <div>
                <label className="block text-sm font-medium mb-1 text-base-content">
                  Nom Complete
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <div className="bg-base-300 p-3 rounded">{user.name}</div>
                )}
              </div>

              {/* Champ Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-base-content">
                  Adresse e-mail
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <div className="bg-base-300 p-3 rounded">{user.email}</div>
                )}
              </div>

              {/* Champ Mot de passe visible uniquement en édition */}
              {isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-base-content">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-base-content">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      placeholder="Confirmer le mot de passe"
                    />
                  </div>
                </>
              )}

              {/* BOUTONS : visibles seulement en mode édition */}
              {isEditing && (
                <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={handleCancel}
                  >
                    <X className="w-4 h-4 mr-1" /> Annuler
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    <Save className="w-4 h-4 mr-1" /> Enregistrer
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
