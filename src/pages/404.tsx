import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <span>
        Oups, page non trouvée, retourner à{" "}
        <Link to="/" className="text-cyan-700">
          l'accueil
        </Link>{" "}
        ?
      </span>
    </div>
  );
}
