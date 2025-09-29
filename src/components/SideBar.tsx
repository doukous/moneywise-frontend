import { NavLink } from "react-router";

export default function SideBar() {
  return (
    <div className="w-64 h-screen bg-stone-100 flex flex-col items-center py-8 px-4 gap-y-4">
      <h1 className="font-bold text-2xl">MoneyWise</h1>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `w-full h-12 rounded-xl flex items-center px-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) =>
          `w-full h-12 rounded-xl flex items-center px-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        Profil
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          `w-full h-12 rounded-xl flex items-center px-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        Transactions
      </NavLink>
      <NavLink
        to="/statistiques"
        className={({ isActive }) =>
          `w-full h-12 rounded-xl flex items-center px-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        Statistiques
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          `w-full h-12 rounded-xl flex items-center px-4 ${
            isActive && "bg-amber-300"
          } mt-auto`
        }
      >
        Déconnexion
      </NavLink>
    </div>
  );
}
