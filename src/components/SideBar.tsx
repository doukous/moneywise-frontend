import { ChartPie, Inbox, LogOut, User, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

export default function SideBar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(1400);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setWidth(window.innerWidth);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      id="sidebar"
      className={
        width < 800 ?
        `bottom-0 bg-white fixed w-full flex justify-around`
        :
        `${width < 1000 ? 'w-22' : 'w-48'} h-full shrink-0 bg-stone-200 flex flex-col py-8 px-4 gap-y-4`
      }  
    >
    {
      width > 1000 &&
      <h1 className="font-bold text-center text-2xl">MoneyWise</h1>
    }

      <NavLink
        to="/"
        className={({ isActive }) =>
          `{${width > 800 ? 'w-full' : 'w-fit'} h-12 rounded-xl flex items-center px-4 gap-x-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        <Inbox />
        {width > 1000 && <span>Dashboard</span>}
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `{${width > 800 ? 'w-full' : 'w-fit'} h-12 rounded-xl flex items-center px-4 gap-x-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        <User />
        {width > 1000 && <span>Profil</span>}
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          `{${width > 800 ? 'w-full' : 'w-fit'} h-12 rounded-xl flex items-center px-4 gap-x-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        <Wallet />
        {width > 1000 && <span>Transactions</span>}
      </NavLink>
      <NavLink
        to="/statistiques"
        className={({ isActive }) =>
          `{${width > 800 ? 'w-full' : 'w-fit'} h-12 rounded-xl flex items-center px-4 gap-x-4 ${
            isActive && "bg-amber-300"
          }`
        }
      >
        <ChartPie />
        {width > 1000 && <span>Statistiques</span>}
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          `{${width > 800 ? 'w-full' : 'w-fit'} h-12 rounded-xl flex items-center px-4 gap-x-4 ${
            isActive && "bg-amber-300"
          } mt-auto`
        }
      >
        <LogOut />
        {width > 1000 && <span>Déconnexion</span>}
      </NavLink>
    </div>
  );
}
