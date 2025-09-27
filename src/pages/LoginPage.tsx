import { Form, Link } from "react-router";

export default function ConnexionPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-y-8">
            <Form action="/api/auth/login" method="post" className="flex flex-col items-center justify-center gap-y-4">
                <h1>Page de connexion</h1>
                <div className="flex flex-col">
                    <label htmlFor="mail-adress">Adresse mail</label>
                    <input type="email" id="mail-adress" className="border-2 border-black" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" className="border-2 border-black" />
                </div>
                <button type="submit" className="border-2 p-2">Se connecter</button>
                <hr className="bg-black w-full" />
            </Form>
            <button type="button" className="border-2 p-2">Continuer avec Google</button>
            <span>Vous n'avez pas de compte ? <Link to='/auth/register' className="text-cyan-700">S'inscrire</Link></span>
        </div>
    )    
}