import { Link } from "react-router";
//import { BackService } from "../lib/backendFetch";
//import { TransactionService } from "../lib/service/transaction";
//
//const transactions = [
//  {
//    id: "", // si l'API génère l'id côté serveur, laisse vide ou supprime la propriété
//    name: "Salaire Mai",
//    amount: 500000,
//    category: 1,
//    description: "Salaire mensuel",
//    type: "income",
//    date: "2025-09-01 08:00",
//  },
//  {
//    id: "",
//    name: "Achat courses",
//    amount: 45000,
//    category: 2,
//    description: "Courses hebdomadaires",
//    type: "expense",
//    date: "2025-09-02 17:30",
//  },
//  {
//    id: "",
//    name: "Freelance",
//    amount: 120000,
//    category: 3,
//    description: "Mission de consulting",
//    type: "income",
//    date: "2025-09-05 11:15",
//  },
//];
//
//const res = await TransactionService.create({
//  user_id: 7,
//  name: "Salaire Mai",
//  amount: 500000,
//  category: 1,
//  description: "Salaire mensuel",
//  type: "income",
//  date: "2025-09-01 08:00",
//});
//
//console.log(res);

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
