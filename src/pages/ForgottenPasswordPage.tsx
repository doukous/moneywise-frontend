import { Form, useSearchParams } from "react-router";
import { useActionData } from "react-router";
import { usePasswordConformityCheck } from "../lib/hooks";

export default function ForgottenPasswordPage() {
  const {
    passwordRef,
    confirmationPasswordRef,
    samePasswords,
    checkPasswordsConformity,
  } = usePasswordConformityCheck();

  const actionData = useActionData();
  const params = useSearchParams()[0];
  const token = params.get("token");
  const email = params.get("email");

  return token && email ? (
    ! actionData ?
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-xl font-semibold">Modifier le mot de passe</h1>
      <Form method="post" className="flex flex-col gap-y-8">
        <div className="flex flex-col w-76">
          <input type="hidden" name="mail-address" value={email} />
          <input type="hidden" name="token" value={token} />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input"
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
        <button
          type="submit"
          className="btn btn-primary"
          name="submit-btn"
          value="submit-password"
        >
          Changer le mot de passe
        </button>
      </Form>
    </div>
    :
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-semibold">Mot de passe réinitialisé</h1>
      <p className="text-center">
      Votre mot de passe a été réinitialisé avec succès.
      </p>
      <a href="/auth/login" className="btn btn-primary mt-4">
      Se connecter
      </a>
    </div>
  ) : !actionData ? (
    <div className="w-full h-screen flex justify-center">
      <div className="w-84 flex flex-col items-center justify-center gap-y-8">
        <h1 className="text-3xl font-extrabold text-center">
          Récupération <br />
          du mot de passe
        </h1>
        <Form method="post" className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col">
            <label htmlFor="mail-address">Adresse mail</label>
            <input
              type="email"
              name="mail-address"
              id="mail-adress"
              className="w-84 input"
              required
              placeholder="user@example.com"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Le mail doit etre de la forme user@example.com>"
            />
          </div>
          <button
            type="submit"
            className="w-84 btn btn-primary"
            name="submit-btn"
            value="submit-email"
          >
            Envoyer l'email de récupération
          </button>
        </Form>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-8">
      <span className="text-center text-xl">
        Mail de récupération envoyé, à l'adresse mail <br /> <strong>{actionData.email}{" "}</strong>
        <br /> vérifiez votre courriel
      </span>
      <span className="text-xl">Pas de mail reçu ?</span>
      <Form method="post" className="flex flex-col items-center justify-center gap-y-4">
        <input type="hidden" name="mail-address" value={actionData.email} />
        <button
          type="button"
          className="btn btn-secondary"
          name="submit-btn"
          value="submit-email"
        >
          Renvoyer le mail
        </button>
      </Form>
    </div>
  );
}
