import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-4">
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
  );
}
