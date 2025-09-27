import { Form } from "react-router";

export default function ForgottenPasswordPage() {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-76 flex flex-col items-center justify-center gap-y-8">
        <Form method="post" className="flex flex-col items-center gap-y-8">
          <h1 className="text-3xl font-extrabold text-center">
            Récupération <br />
            du mot de passe
          </h1>
          <div className="flex flex-col">
            <label htmlFor="mail-address">Adresse mail</label>
            <input
              type="email"
              name="mail-address"
              id="mail-adress"
              className="w-76 input"
              required
              placeholder="user@example.com"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Le mail doit etre de la forme user@example.com>"
            />
          </div>
        </Form>
        <button type="button" className="w-76 btn btn-primary">
            Envoyer l'email de récupération
        </button>
      </div>
    </div>
  );
}
