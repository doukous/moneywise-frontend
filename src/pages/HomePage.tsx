import { useLoaderData } from "react-router";
import SideBar from "../components/SideBar";
import type { TransactionList, User } from "../lib/service/dto";

function capitalizeName(fullname: string): string {
  return fullname
    .split(" ")
    .map(
      (name: string) =>
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    )
    .join(" ");
}

export default function HomePage() {
  const { user, transactions }: { user: User; transactions: TransactionList } =
    useLoaderData();

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex-1 h-screen flex flex-col justify-around items-center gap-y-4">
        <div className="w-3/4 flex justify-between">
          <h1 className="text-2xl">Bonjour {capitalizeName(user.name)}</h1>
          <div className="card bg-gray-200 w-48 h-24 p-4 flex flex-col">
            <h2 className="font-medium">Budget</h2>
            <span className="self-end text-3xl font-bold">{user.budget}</span>
          </div>
        </div>
        <div className="w-3/4 h-1/2 p-2 rounded-2xl border-1 border-gray-300 flex flex-col items-center">
          <h1 className="font-bold text-2xl">Les dernières transactions</h1>
          {transactions.count === 0 ? (
            <span className="m-auto">Aucune transaction pour le moment</span>
          ) : (
            transactions.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded shadow p-2 my-2 flex justify-between items-center"
              >
                <span>{transaction.description}</span>
                <span className="font-semibold">{transaction.amount}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
