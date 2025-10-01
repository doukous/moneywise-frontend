import { Form, Link } from "react-router";
// import { useActionData } from "react-router";

export default function ConnexionPage() {
  // const actionData = useActionData();

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-76 flex flex-col items-center justify-center gap-y-12">
        
        <Form method="post" className="flex flex-col items-center gap-y-8">
          <h1 className="text-3xl font-extrabold">Page de connexion</h1>
          <div className="flex flex-col">
            <label htmlFor="mail-address">Adresse mail</label>
            <input
              type="email"
              name="mail-address"
              id="mail-address"
              className="w-76 input"
              required
              placeholder="user@example.com"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Le mail doit etre de la forme user@example.com>"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-76 input"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="w-full btn btn-accent">
            Se connecter
          </button>
        </Form>
        <span className="divider">ou</span>
        <button type="button" className="w-76 btn btn-primary">
          Continuer avec Google
        </button>
        <Link to="/auth/password_reset" className="text-cyan-700">
          Mot de passe oublié ?
        </Link>
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
