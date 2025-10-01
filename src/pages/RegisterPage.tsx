import { Form, Link, useActionData } from "react-router";
import { usePasswordConformityCheck } from "../lib/hooks";

export default function RegisterPage() {
  const { passwordRef, confirmationPasswordRef, samePasswords, checkPasswordsConformity }= usePasswordConformityCheck()  
  const actionData = useActionData();

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-76 flex flex-col items-center justify-center gap-y-6">
        <h1 className="text-3xl font-extrabold">Page d'inscription</h1>
        {actionData && <span>Donnés renvoyées {actionData.response}</span>}
        <Form method="post" className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col">
            <label htmlFor="fullname">Nom complet</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="w-76 input"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mail-adress">Adresse mail</label>
            <input
              type="email"
              name="mail-address"
              id="mail-adress"
              className="w-76 input"
              placeholder="user@example.com"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Le mail doit etre de la forme user@example.com>"
            />
          </div>
          <div className="flex flex-col w-76">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full input"
              required
              minLength={6}
              ref={passwordRef}
            />
          </div>
          <div className="flex flex-col w-76">
            <label htmlFor="confirmation-password">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="confirmation-password"
              name="confirmation-password"
              className={`input ${!samePasswords && "input-error"}`}
              required
              minLength={6}
              ref={confirmationPasswordRef}
              onBlur={checkPasswordsConformity}
            />
            {!samePasswords && (
              <span className="text-error">
                Les deux mots de passe doivent etre identiques
              </span>
            )}
          </div>
          <button type="submit" className="w-full btn btn-accent">
            S'inscrire
          </button>
        </Form>
        <span className="divider my-0">ou</span>
        <span>
          Vous avez déjà un compte ?{" "}
          <Link to="/auth/login" className="text-cyan-700">
            Se connecter
          </Link>
        </span>
      </div>
    </div>
  );
}
