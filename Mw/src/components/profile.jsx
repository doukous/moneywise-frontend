import React, { useState, useEffect } from "react";
import { User, Mail, Edit, Save, X } from "lucide-react";
import { getUserProfile, updateUserProfile, getUserStats } from "../services/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ transactions: 0, categories: 0, total: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Charger profil + stats
  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUser(data);
        setFormData({ name: data.name || "", email: data.email || "" });
      })
      .catch((err) => console.error("Erreur profil :", err));

    getUserStats()
      .then((data) => {
        setStats({
          transactions: data.totalTransactions || 0,
          categories: data.activeCategories || 0,
          total: data.total || 0,
        });
      })
      .catch((err) => console.error("Erreur stats :", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || "", email: user?.email || "" });
    setIsEditing(false);
  };

  if (!user) {
    return <div className="p-6">Chargement du profil...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
      <p className="text-gray-600 mt-1">Gérez vos informations personnelles</p>

      {/* Informations personnelles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit className="h-4 w-4 inline mr-2" /> Modifier
            </button>
          ) : (
            <div className="space-x-2">
              <button onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <X className="h-4 w-4 inline mr-2" /> Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Save className="h-4 w-4 inline mr-2" /> Enregistrer
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user?.name?.[0]}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Membre depuis {new Date(user?.created_at).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg">{user?.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg">{user?.email}</div>
            )}
          </div>
        </form>
      </div>

      {/* Statistiques */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques du compte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.transactions}</div>
            <div className="text-sm text-gray-600">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.categories}</div>
            <div className="text-sm text-gray-600">Catégories actives</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Montant total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
