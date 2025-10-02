import {
  ChartPie,
  Inbox,
  LogOut,
  User,
  Wallet,
  FileChartColumn,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import { useRef } from "react";

export default function SideBar() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `h-12 rounded-xl flex items-center justify-center md:justify-start gap-x-4 md:px-4 transition-colors duration-200 ${
      isActive ? "bg-primary text-primary-content" : "hover:bg-base-300"
    }`;

  const modalRef = useRef<HTMLDialogElement>(null);

    return (
    <>
      <div
        id="sidebar"
        className="fixed bottom-0 w-full flex justify-around bg-base-100 p-2 z-50
                 md:relative md:h-full md:w-22 md:flex-col md:justify-start md:py-8 md:px-4 md:gap-y-4 md:bg-base-200
                 lg:w-48 transition-all duration-300"
      >
        <h1 className="font-bold text-center text-2xl hidden lg:block">
          MoneyWise
        </h1>

        <NavLink to="/" className={getNavLinkClass}>
          <Inbox />
          <span className="hidden lg:inline">Dashboard</span>
        </NavLink>
        <NavLink to="/profile" className={getNavLinkClass}>
          <User />
          <span className="hidden lg:inline">Profil</span>
        </NavLink>
        <NavLink to="/transactions" className={getNavLinkClass}>
          <Wallet />
          <span className="hidden lg:inline">Transactions</span>
        </NavLink>
        <NavLink to="/statistiques" className={getNavLinkClass}>
          <ChartPie />
          <span className="hidden lg:inline">Statistiques</span>
        </NavLink>
        <NavLink to="/reports" className={getNavLinkClass}>
          <FileChartColumn />
          <span className="hidden lg:inline">Rapport</span>
        </NavLink>

        <button
          className="h-12 rounded-xl flex items-center justify-center md:justify-start gap-x-4 md:px-4 transition-colors duration-200 hover:bg-base-300 md:mt-auto"
          onClick={() => modalRef.current?.showModal()}
        >
          <LogOut />
          <span className="hidden lg:inline">Déconnexion</span>
        </button>
      </div>

      <dialog id="logout_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">Êtes-vous sûr de vouloir vous déconnecter ?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Annuler</button>
            </form>

            <Link to='/auth/logout' className="btn btn-primary">
              Confirmer
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
