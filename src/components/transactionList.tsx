import { useState } from "react";
import type { Transaction, Category } from "../lib/service/dto";
import TransactionForm from "./TransactionForm";
import { TransactionService } from "../lib/service/transaction";

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
    id: null,
    title: "",
    amount: 0,
    date: "",
    category_name: "",
    description: "",
    category: {id: 0, name: "", type: "expense"},
    type: "expense",
  });
  console.log({tlist, cate});
  const handleAdd = () => {
    setTrans({
      id: null,
      title: "",
      amount: 0,
      date: "",
      category_name: "",
      description: "",
      category: {id: 0, name: "", type: "expense"},
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
              <td>{transaction.title}</td>
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
                {transaction.category.name}
              </td>
              <td className="flex gap-2 text-center justify-center items-center">
                <button
                  onClick={() => {
                    setTrans(transaction);
                    setModal(true);
                  }}
                  className="btn btn-info btn-sm"
                  aria-label="edit">
                    modifier
                </button>
                <button
                  //delete
                  onClick={async () => {
                    if (transaction.id !== null) {
                      if (window.confirm("Are you sure you want to delete this transaction?")) {
                        const res =await TransactionService.delete(transaction.id);
                        console.log({res});
                        window.location.reload();
                      }
                    }
                  }}
                  className="btn btn-warning btn-sm"
                  aria-label="delete">
                    supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
