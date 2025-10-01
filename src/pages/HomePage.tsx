import { useLoaderData } from "react-router";
import SideBar from "../components/SideBar";
import type { TransactionList, User } from "../lib/service/dto";

function capitalizeName(fullname: string): string {
  return fullname
    .split(" ")
    .map(
      (name: string) =>
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    )
    .join(" ");
}

export default function HomePage() {
  const { user, transactions }: { user: User; transactions: TransactionList } =
    useLoaderData();

  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <div className="flex-1">
        <div className="max-w-196 mx-auto px-4 h-full flex flex-col justify-around items-center gap-y-4">
          <div className="w-full flex justify-between">
            {user?.name && <h1 className="text-2xl">Bonjour {capitalizeName(user.name)}</h1>}
            <div className="card bg-gray-200 w-64 h-28 p-4 flex flex-col gap-y-4">
              <h2 className="font-medium">Budget</h2>
              <span className="self-end text-3xl font-bold">
                {Number(user.budget)} F CFA
              </span>
            </div>
          </div>
          <div className="w-full h-1/2 overflow-x-scroll p-2 rounded-2xl border-1 border-gray-300 flex flex-col items-center">
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
    </div>
  );
}
