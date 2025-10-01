import React, { useState, useEffect, type FormEvent } from "react";
import { Edit, Save, X, Upload } from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
  type User,
} from "../services/auth";
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

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUser(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          dateOfBirth: data.dateOfBirth || "",
          password: "",
          profileImage: data.profileImage || "",
        });
      })
      .catch(() => {
        const mockUser: User = {
          id: 1,
          firstName: "Cheikhouna",
          lastName: "DIOP",
          email: "Diop.cheikhunaa@example.com",
          mobileNumber: "+221 77 000 00 00",
          dateOfBirth: "2000-01-01",
          profileImage: "",
          created_at: "2025-01-01T10:00:00",
          updated_at: "2025-01-01T10:00:00",
          name: "",
        };
        setUser(mockUser);
        setFormData({
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          mobileNumber: mockUser.mobileNumber,
          dateOfBirth: mockUser.dateOfBirth,
          password: "",
          profileImage: mockUser.profileImage,
        });
      });
  }, []);

  const handleSubmit = async (e?: FormEvent | React.MouseEvent) => {
    if (e && "preventDefault" in e) e.preventDefault();
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
        <h1 className="text-2xl font-bold">Profil (chargement...)</h1>
        <p className="text-gray-600">Veuillez patienter.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex">
      <SideBar />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600 mt-1">Gérez vos informations personnelles</p>
          </div>
          <div className="flex items-center gap-3">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profil"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.firstName?.[0]}
              </div>
            )}
            <span className="font-medium text-gray-800">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Informations personnelles
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit className="h-4 w-4 inline mr-2" /> Modifier
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <X className="h-4 w-4 inline mr-2" /> Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Save className="h-4 w-4 inline mr-2" /> Enregistrer
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6 mb-8">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profil"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.firstName?.[0]}
              </div>
            )}

            {isEditing && (
              <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline">
                <Upload className="h-4 w-4" />
                Changer la photo
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.firstName}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.lastName}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.dateOfBirth}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.mobileNumber}</div>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{user.email}</div>
                )}
              </div>

              {isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Enregistrer
                  </button>
                </>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
