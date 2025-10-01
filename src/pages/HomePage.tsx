import { useMemo } from "react";
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

  const { monthlyIncome, monthlyExpense } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let income = 0;
    let expense = 0;

    transactions.transactions.forEach((t) => {
      const transactionDate = new Date(t.date);
      if (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {
        if (t.type === "income") {
          income += t.amount;
        } else {
          expense += t.amount;
        }
      }
    });

    return { monthlyIncome: income, monthlyExpense: expense };
  }, [transactions]);

  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-y-8">
          <div className="w-full">
            {user?.name && (
              <h1 className="text-2xl mb-4">Bonjour {capitalizeName(user.name)}</h1>
            )}
            <div className="w-full flex flex-wrap justify-between gap-4">
              <div className="card bg-base-200 shadow-md w-full sm:w-60 md:w-64 h-28 p-4 flex flex-col justify-between">
                <h2 className="font-medium">Budget</h2>
                <span className="self-end text-3xl font-bold">
                  {Number(user.budget)} F CFA
                </span>
              </div>
              <div className="card bg-base-200 shadow-md w-full sm:w-60 md:w-64 h-28 p-4 flex flex-col justify-between">
                <h2 className="font-medium">Revenus (Mois)</h2>
                <span className="self-end text-3xl font-bold text-success">
                  +{monthlyIncome} F CFA
                </span>
              </div>
              <div className="card bg-base-200 shadow-md w-full sm:w-60 md:w-64 h-28 p-4 flex flex-col justify-between">
                <h2 className="font-medium">Dépenses (Mois)</h2>
                <span className="self-end text-3xl font-bold text-error">
                  -{monthlyExpense} F CFA
                </span>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto border border-gray-300 rounded-2xl">
            <h1 className="font-bold text-2xl text-center p-4">
              Les dernières transactions
            </h1>
            {transactions.count === 0 ? (
              <p className="text-center p-4">
                Aucune transaction pour le moment
              </p>
            ) : (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Montant</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <span
                          className={
                            transaction.type === "income"
                              ? "text-success"
                              : "text-error"
                          }
                        >
                          {transaction.type === "income" ? "+" : "-"} {" "}
                          {transaction.amount} F CFA
                        </span>
                      </td>
                      <td>{transaction.type}</td>
                      <td>
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}