import type { Transaction } from "../lib/service/dto";
import { TransactionService } from "../lib/service/transaction";

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

  //const handleCategory = (c: Category) => {
  //  setTrans({ ...trans, category_name: c.name });
  //  console.log(c.name, trans);
  //};

  const saveTransaction = async () => {
    // The app persists transactions elsewhere. Keep existing behavior: reset id and close.
    console.log(trans);
    if (trans.id) {
      // update
      const res = await TransactionService.update(trans);
      if (res.success){
        //recharger la page
        window.location.reload();
      }
      return;
    }
    const res = await TransactionService.create(trans);
    if (res.success){
      //recharger la page
      window.location.reload();
    }
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
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Row 1: name / amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label hidden" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                value={trans.title?? ""}
                onChange={(e) => setTrans({ ...trans, title: e.target.value })}
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
                onChange={(e) => setTrans({ ...trans, type: e.target.value as "income" | "expense" })}
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
              {/*Categorie, show or add new*/}
              <div className="flex flex-col gap-2 w-full">
                <input type="text" value={trans.category_name ?? ""} className="input input-bordered w-full" onFocus={() => setDown(!down)} placeholder="Nouveau catégorie" onChange={(e) => setTrans({ ...trans, category_name: e.target.value })} />
                {down === true && cate.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {cate.map((c) => (
                      <button
                        aria-label="category"
                        type="button"
                        className="btn btn-outline btn-sm"
                        key={c.id}
                        onClick={() => setTrans({ ...trans, category_name: c.name })}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="form-control">
              <label className="label hidden" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={trans.date}
                onChange={(e) => setTrans({ ...trans, date: e.target.value })}
                className="input input-bordered w-full"
                placeholder="exemple : 13/02/2022 22:45"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                void saveTransaction();
              }}
              className="btn btn-info"
            >
              {trans.id !== null ? "Modifier" : "Ajouter"}
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
