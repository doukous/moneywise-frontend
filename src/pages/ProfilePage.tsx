import React, { useState, useEffect, type FormEvent } from "react";
import { Edit, Save, X, Upload } from "lucide-react";
import { updateUserProfile, type User } from "../services/auth";
import { useLoaderData } from "react-router";
import SideBar from "../components/SideBar";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    password: "",
    profileImage: "",
  });

  const loaderData = useLoaderData();

  const extractProfileImage = (u: unknown): string => {
    if (!u) return "";
    const obj = u as Record<string, unknown>;
    const val = obj["profileImage"] ?? obj["profile_image"] ?? "";
    return typeof val === "string" ? val : "";
  };

  useEffect(() => {
    const maybeUser = loaderData as User | null;
    if (maybeUser) {
      setUser(maybeUser);
      setFormData({
        firstName: maybeUser.firstName || "",
        lastName: maybeUser.lastName || "",
        email: maybeUser.email || "",
        mobileNumber: maybeUser.mobileNumber || "",
        dateOfBirth: maybeUser.dateOfBirth || "",
        password: "",
        profileImage: extractProfileImage(loaderData),
      });
    }
  }, [loaderData]);

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        password: "",
        profileImage: user.profileImage || "",
      });
    }
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-base-content">Chargement du profil...</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-base-100 flex flex-col sm:flex-row">
      <SideBar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-base-content">Paramètres</h1>
              <p className="text-sm text-base-content/60">Gérez vos informations personnelles</p>
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
                  {(user.firstName ?? user?.name ?? "U")[0]}
                </div>
              )}
              <span className="font-medium text-base-content">
                {`${formData.firstName} ${formData.lastName}`}
              </span>
            </div>
          </div>

          {/* Bloc principal */}
          <div className="bg-base-200 rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-base-content">Informations personnelles</h2>
              {!isEditing && (
                <button className="btn btn-sm btn-ghost text-primary" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" /> Modifier
                </button>
              )}
            </div>

            <div className="flex items-center space-x-6">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profil"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.firstName?.[0]}
                </div>
              )}

              {isEditing && (
                <label className="cursor-pointer text-primary flex items-center gap-2 hover:underline">
                  <Upload className="w-4 h-4" />
                  Changer la photo
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              )}
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              {[
                { label: "Prénom", key: "firstName", type: "text" },
                { label: "Nom", key: "lastName", type: "text" },
                { label: "Date de naissance", key: "dateOfBirth", type: "date" },
                { label: "Numéro de téléphone", key: "mobileNumber", type: "text" },
                { label: "Adresse e-mail", key: "email", type: "email", colSpan: true },
              ].map(({ label, key, type, colSpan }) => (
                <div key={key} className={colSpan ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium mb-1 text-base-content">{label}</label>
                  {isEditing ? (
                    <input
                      type={type}
                      className="input input-bordered w-full"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      value={(formData as any)[key]}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                    />
                  ) : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <div className="bg-base-300 p-3 rounded">{(user as any)[key]}</div>
                  )}
                </div>
              ))}

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
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
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

              {/* Boutons d'action */}
              {isEditing && (
                <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
                  <button type="button" className="btn btn-sm btn-ghost" onClick={handleCancel}>
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
