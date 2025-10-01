import { useState } from "react";
import type { Transaction, Category } from "../lib/service/dto";
import TransactionForm from "./TransactionForm";

<<<<<<< HEAD
export function TransactionList({
  tlist,
  cate,
}: {
  tlist: Transaction[];
  cate: Category[];
}) {
  const [modal, setModal] = useState(false);
  const [down, setDown] = useState(false);
  const [trans, setTrans] = useState<Transaction>({
    id: 0,
    name: "",
    amount: 0,
    user_id: 0,
    date: "",
    category: null,
    type: "",
  });
=======
const transactions: Transaction[] = [
    {
        id: 1,
        name: "Achat Amazon",
        amount: 50,
        date: "2023-10-01 10:00",
        category: ["Shopping", "Online"],
        type: "expense"
    },
    {
        id: "2",
        name: "Salaire",
        amount: 2000,
        category: ["Income", "Job"],
        type: "income",
        date: "2023-10-01 09:00"
    },
    {
        id: "3",
        name: "Dîner au restaurant",
        amount: 80,
        category: ["Food", "Dining"],
        type: "expense",
        date: "2023-10-02 20:00"
    },
    {
        id: "4",
        name: "Vente de vélo",
        amount: 300,
        category: ["Income", "Sale"],
        type: "income",
        date: "2023-10-03 15:30"
    },
]
>>>>>>> 2127264 (merge)

  const editTransaction = (transedit: Transaction) => {
    // prepare form for editing (currently just logs)
    console.log("editTransaction", transedit);
    setTrans(transedit);
    setModal(true);
  };
  const handleAdd = () => {
    setTrans({
      id: 0,
      name: "",
      amount: 0,
      user_id: 0,
      date: "",
      category: null,
      type: "expense",
    });
    setModal(true);
  };
  return (
    <div className="overflow-x-auto">
      {/* tables des transactions */}
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>
              <button
                className="btn btn-primary btn-sm btn-soft"
                onClick={handleAdd}
              >
                Ajouter
              </button>
              {modal === true ? (
                <TransactionForm
                  trans={trans}
                  setTrans={setTrans}
                  cate={cate}
                  down={down}
                  setDown={setDown}
                  onClose={() => setModal(false)}
                />
              ) : null}
            </th>
            <th>Nom</th>
            <th>Montant</th>
            <th>Type</th>
            <th>Date</th>
            <th>Catégories</th>
            <th>Voire</th>
          </tr>
        </thead>
        <tbody className="divide-y text-left">
          {tlist.map((transaction) => (
            <tr key={transaction.id}>
              <th>{transaction.id}</th>
              <td>{transaction.name}</td>
              <td>{transaction.amount}</td>
              <td>
                {transaction.type === "expense" ? (
                  <span className="badge badge-error badge-soft">Depense</span>
                ) : (
                  <span className="badge badge-success badge-soft">Revenu</span>
                )}
              </td>
              <td>{transaction.date}</td>
              <td>
                {cate.find((c) => c.id === transaction.category)?.name ?? ""}
              </td>
              <td>
                <button
                  aria-label="edit"
                  onClick={() => editTransaction(transaction)}
                  className="btn btn-accent btn-soft btn-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
