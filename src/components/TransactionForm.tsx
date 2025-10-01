import React, { useState } from "react";
import type { Transaction } from "../lib/service/dto";

type Category = { id: number; name: string; type: string };

type Props = {
  trans: Transaction;
  setTrans: React.Dispatch<React.SetStateAction<Transaction>>;
  cate: Category[];
  down: boolean;
  setDown: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

export function TransactionForm({
  trans,
  setTrans,
  cate,
  down,
  setDown,
  onClose,
}: Props) {
  const [newcate, setNewCate] = useState<Category>({
    id: 0,
    name: "",
    type: "expense",
  });
  const newCate = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    // Keep existing behavior: add locally to the cate array (parent should persist)
    if (newcate && newcate.name.trim() !== "") {
      cate.push({ id: 0, name: newcate.name.trim(), type: "expense" });
      setNewCate({ id: 0, name: "", type: "expense" });
    }
  };

  const saveTransaction = () => {
    // The app persists transactions elsewhere. Keep existing behavior: reset id and close.
    trans.id = 0;
    setTrans(trans);
    onClose();
  };

  return (
    <div className="modal modal-open backdrop-blur-sm p-0.5">
      <div className="modal-box w-full h-auto max-w-3xl border-2 border-base-300 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-base-200">
          <h3 className="text-lg sm:text-2xl font-semibold">
            Nouvelle transaction
          </h3>
          <button
            aria-label="Fermer"
            className="btn btn-sm btn-error btn-soft btn-circle"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body / Form */}
        <form
          className="p-4 sm:p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            saveTransaction();
          }}
        >
          {/* Row 1: name / amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label hidden" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                value={trans.name}
                onChange={(e) => setTrans({ ...trans, name: e.target.value })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Nom de la transaction"
              />
            </div>

            <div className="form-control">
              <label className="label hidden" htmlFor="amount">
                Montant
              </label>
              <input
                id="amount"
                value={trans.amount === 0 ? "" : trans.amount}
                onChange={(e) =>
                  setTrans({ ...trans, amount: Number(e.target.value) })
                }
                type="number"
                className="input input-bordered w-full"
                placeholder="Montant"
              />
            </div>
          </div>

          {/* Row 2: type / category / date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="form-control">
              <label className="label hidden" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                value={trans.type || "expense"}
                onChange={(e) => setTrans({ ...trans, type: e.target.value })}
                className="select select-bordered w-full"
                aria-label="Type de transaction"
              >
                <option value="expense">Dépense</option>
                <option value="income">Revenu</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label hidden" htmlFor="category">
                Catégorie
              </label>

              <div className="flex flex-col gap-2 w-full">
                {trans.category !== null && trans.category !== undefined ? (
                  <span
                    key={String(trans.category)}
                    onClick={() => setTrans({ ...trans, category: null })}
                    className="badge badge-info badge-outline cursor-pointer"
                  >
                    {cate.find((c) => c.id === trans.category)?.name ??
                      String(trans.category)}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDown(!down)}
                    className="btn btn-outline mb-0.5"
                  >
                    + catégorie
                  </button>
                )}
              </div>

              {/* NOTE: Keep the existing down-modal block unchanged as requested */}
              {down === true ? (
                <div className=" inset-0 w-80 h-full bg-base-100/60 flex items-center justify-center">
                  <div className="w-full max-w-96 bg-base-100 p-4 rounded shadow border">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setNewCate({ ...newcate, name: e.target.value })
                        }
                        value={newcate.name}
                        placeholder="nouvelle catégorie"
                      />
                      <select
                        id="type"
                        value={newcate.type || "expense"}
                        onChange={(e) =>
                          setNewCate({ ...newcate, type: e.target.value })
                        }
                        className="select select-bordered w-full"
                        aria-label="Type de transaction"
                      >
                        <option value="expense">Dépense</option>
                        <option value="income">Revenu</option>
                      </select>
                      <button
                        type="button"
                        onClick={(e) => newCate(e)}
                        className="btn btn-accent btn-sm"
                      >
                        Ajouter
                      </button>
                    </div>

                    <div className="p-2 flex flex-col gap-1">
                      {cate.map((c) => (
                        <button
                          type="button"
                          onClick={() => {
                            setTrans({ ...trans, category: c.id });
                            setDown(false);
                          }}
                          className="btn btn-accent btn-soft"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="form-control">
              <label className="label hidden" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="text"
                value={trans.date}
                className="input input-bordered w-full"
                placeholder="exemple : 13/02/2022 22:45"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button type="submit" className="btn btn-info">
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-warning btn-soft"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
