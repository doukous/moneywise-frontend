import { Link, useLoaderData } from "react-router";
import SideBar from "../components/SideBar";
import type { User } from "../lib/service/dto";

export default function HomePage() {
  const { data } : { data: User } = useLoaderData()

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex-1 h-screen flex flex-col justify-center items-center gap-y-4">
        {
          data &&
            <span className="text-2xl py-16">Bonjour {data.name.toUpperCase()}</span>
        }
        <span className="font-semibold text-center">
          En construction, <br /> les pages dispos pour le moment :
        </span>
        <div className="flex flex-col items-center gap-y-2">
          <span>
            page de connexion :{" "}
            <Link to="auth/login" className="link link-secondary">
              auth/login
            </Link>
          </span>
          <span>
            page d'inscription :{" "}
            <Link to="auth/register" className="link link-secondary">
              auth/register
            </Link>
          </span>
          <span>
            page de récupération de mot de passe :{" "}
            <Link to="auth/password_reset" className="link link-secondary">
              auth/password_reset
            </Link>
          </span>
          <span>
            page de listage des transactions:{" "}
            <Link to="/transactions" className="link link-secondary">
              transactions
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
