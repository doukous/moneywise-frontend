export default function ForgottenPasswordPage() {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-128 flex flex-col items-center justify-center gap-y-8">
        <h1 className="text-center text-3xl font-bold">Récupération du <br /> mot de passe</h1>
        <div className="w-76 flex flex-col">
          <label htmlFor="mail-adress">Adresse mail</label>
          <input
            type="email"
            id="mail-adress"
            className="w-76 input"
            placeholder="user@example.com"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Le mail doit etre de la forme user@example.com>"
          />
        </div>
        <button className="btn btn-primary">Envoyer un mail de récupération</button>
      </div>
    </div>
  );
}
