import { Form, Link } from "react-router";

export default function RegisterPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-y-4">
            <h1>Page d'inscription</h1>
            <Form action="/api/auth/login" method="post" className="flex flex-col items-center justify-center gap-y-4">
                <div className="flex flex-col">
                    <label htmlFor="fullname">Nom complet</label>
                    <input type="text" name="fullname" id="fullname" className="border-2 border-black" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="mail-adress">Adresse mail</label>
                    <input type="email" name="mail-adress" id="mail-adress" className="border-2 border-black" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" className="border-2 border-black" />
                </div>
                <button type="submit" className="border-2 p-2">S'inscrire</button>
                <hr className="bg-black w-full" />
            </Form>
            <button type="button" className="border-2 p-2">Continuer avec Google</button>
            <span>Déja un compte ? <Link to='/auth/login' className="text-cyan-700">Se connecter</Link></span>
        </div>
    )
}