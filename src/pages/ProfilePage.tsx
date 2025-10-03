import React, { useState, useEffect, type FormEvent } from "react";
import { Edit, Save, X, Upload, CheckCircle, KeyRound } from "lucide-react";
import { updateUserProfile, type User } from "../services/auth";
import { useLoaderData, useNavigate } from "react-router";
import SideBar from "../components/SideBar";

const Profile: React.FC = () => {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  // Initialisation utilisateur
  const initialUser = loaderData && typeof loaderData === "object" && "user" in loaderData
    ? (loaderData.user as User)
    : (loaderData as User | null);

  const [user, setUser] = useState<User | null>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialUser?.name || "",
    email: initialUser?.email || "",
    profileImage: initialUser?.profile_image || "",
  });

  // Mise à jour si le loader change
  useEffect(() => {
    if (initialUser && !user) {
      setUser(initialUser);
      setFormData({
        name: initialUser.name || "",
        email: initialUser.email || "",
        profileImage: initialUser.profile_image || "",
      });
    }
  }, [loaderData, user, initialUser]);

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const data = new FormData();

      if (formData.name !== user.name) data.append("name", formData.name);
      if (formData.email !== user.email) data.append("email", formData.email);
      if (profileFile) data.append("profile_image", profileFile);

      if (Array.from(data.keys()).length === 0) {
        setIsEditing(false);
        setLoading(false);
        return;
      }

      const updatedUser = await updateUserProfile(data);
      setUser(updatedUser);
      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        profileImage: updatedUser.profile_image || "",
      });

      setProfileFile(null);
      setIsEditing(false);
      setSuccessMessage("Profil mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      console.error("Erreur update :", err);
    } finally {
      setLoading(false);
    }
  };

  // Annuler l'édition
  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profileImage: user.profile_image || "",
      });
      setProfileFile(null);
    }
    setIsEditing(false);
  };

  // Upload d'image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  if (!user) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Profil non trouvé ou session expirée.
          </h1>
          <p className="mt-2 text-gray-600">Veuillez vous connecter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-base-100 flex flex-col sm:flex-row">
      <SideBar />

      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-base-content">Paramètres</h1>
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
                  {user.name?.[0] || "U"}
                </div>
              )}
              <span className="font-medium text-base-content">{formData.name}</span>
            </div>
          </div>

          {/* MESSAGE SUCCÈS */}
          {successMessage && (
            <div className="alert alert-success flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* FORM */}
          <div className="bg-base-200 rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-base-content">
                Informations personnelles
              </h2>

              {!isEditing && (
                <button
                  className="btn btn-sm btn-ghost text-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Modifier
                </button>
              )}
            </div>

            {/* PHOTO */}
            <div className="flex items-center space-x-6">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profil"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.name?.[0] || "U"}
                </div>
              )}

              {isEditing && (
                <label className="cursor-pointer text-primary flex items-center gap-2 hover:underline">
                  <Upload className="w-4 h-4" />
                  Changer la photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>

            {/* FORMULAIRE */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium mb-1 text-base-content">
                  Nom Complet
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <div className="bg-base-300 p-3 rounded">{user.name}</div>
                )}
              </div>

              {/* Email */}
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
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                ) : (
                  <div className="bg-base-300 p-3 rounded">{user.email}</div>
                )}
              </div>

              {/* Bouton mot de passe oublié */}
              <div className="md:col-span-2 flex justify-start mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/auth/password_reset")}
                  className="btn btn-outline btn-warning flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Boutons d’action */}
              {isEditing && (
                <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 mr-1" /> Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      "Enregistrement..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-1" /> Enregistrer
                      </>
                    )}
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
