import { Form, Link } from "react-router";

export default function ConnexionPage() {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-76 flex flex-col items-center justify-center gap-y-12">
        <Form
          action="/api/auth/login"
          method="post"
          className="flex flex-col items-center gap-y-8"
        >
          <h1 className="text-3xl font-extrabold">Page de connexion</h1>
          <div className="flex flex-col">
            <label htmlFor="mail-adress">Adresse mail</label>
            <input type="email" id="mail-adress" className="w-76 input" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" className="w-76 input" />
          </div>
          <button type="submit" className="w-full btn btn-accent">
            Se connecter
          </button>
        </Form>
        <span className="divider">ou</span>
        <button type="button" className="w-76 btn btn-primary">
          Continuer avec Google
        </button>
        <span>
          Vous n'avez pas de compte ?{" "}
          <Link to="/auth/register" className="text-cyan-700">
            S'inscrire
          </Link>
        </span>
      </div>
    </div>
  );
}
