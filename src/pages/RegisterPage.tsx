import { useRef, useState } from "react";
import { Form, Link, useActionData } from "react-router";

export default function RegisterPage() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmationPasswordRef = useRef<HTMLInputElement | null>(null);
  const [samePasswords, setSamePasswords] = useState(true);
  const actionData = useActionData();

  function checkPasswordsConformity() {
    if (passwordRef.current?.value !== confirmationPasswordRef.current?.value) {
      setSamePasswords(false);
    } else {
      setSamePasswords(true);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-76 flex flex-col items-center justify-center gap-y-6">
        <h1 className="text-3xl font-extrabold">Page d'inscription</h1>
        <Form method="post" className="flex flex-col items-center gap-y-8">
          {actionData && (
            <span>Data retourné : fullname : {actionData.data}</span>
          )}
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
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-76 input"
              required
              minLength={8}
              ref={passwordRef}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmation-password">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="confirmation-password"
              className={`w-76 input ${!samePasswords && "input-error"}`}
              required
              minLength={8}
              ref={confirmationPasswordRef}
              onBlur={checkPasswordsConformity}
            />
            {!samePasswords && (
              <span className="text-error w-full">
                Les deux mots de passe doivent etre identiques
              </span>
            )}
          </div>
          <button type="submit" className="w-full btn btn-accent">
            S'inscrire
          </button>
        </Form>
        <span className="divider my-0">ou</span>
        <button type="button" className="w-76 btn btn-primary">
          Continuer avec Google
        </button>
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
