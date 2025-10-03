import React, { useState, useEffect } from "react"; // Ajout de useEffect
import { useLoaderData } from "react-router";
import type {
  Transaction,
  TransActionList,
  User,
  Category,
} from "../lib/service/dto";
import { TransactionList } from "../components/transactionList";
import SideBar from "../components/SideBar";
import "../index.css";

export function TransactionPage() {
  const {
    user,
    transactions,
    categories,
  }: { user: User; transactions: TransActionList; categories: Category[] } =
    useLoaderData();
  const [transactionList, setTransactionList] = useState<Transaction[]>(
    transactions?.transactions || [],
  );
  const [row, setRow] = useState("Nom");
// ✅ Ajout pour enregistrer les données dans sessionStorage
useEffect(() => {
  if (transactionList && transactionList.length > 0) {
    sessionStorage.setItem("transactions", JSON.stringify(transactionList));
  }
}, [transactionList]);



  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if (!query) {
      setTransactionList(transactions?.transactions ?? []);
      return;
    }
    const list = (transactions?.transactions ?? []).filter((t) => {
      if (row === "Nom") {
        const name = (t.title ?? t.description ?? "").toString().toLowerCase();
        return name.includes(query);
      }
      if (row === "Categories") {
        const catFromName = (t.category_name ?? "").toString();
        let cat = catFromName;
        try {
          if (!cat && t.category) {
            if (typeof t.category === "object" && t.category?.name) {
              cat = String(t.category.name);
            } else {
              cat = String(t.category);
            }
          }
        } catch {
          cat = String(t.category_name ?? "");
        }
        return cat.toLowerCase().includes(query);
      }
      return false;
    });

    setTransactionList(list);
  };

  const initials = (user?.name ?? "").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "U";

  return (
    <div className="w-full h-screen overflow-y-scroll bg-base-100 flex flex-col sm:flex-row">
      <SideBar />
      <div className="flex-1 flex flex-col items-center justify-start gap-y-4 p-4">
        {/* header */}
        <div className="w-full max-w-6xl px-4">
          <div className="w-full flex items-center justify-between py-6">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <div className="flex items-center gap-x-2" id="avatar">
              <div className="hidden sm:block font-semibold">{user?.name}</div>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                {user?.profile_image ? (
                  <img src={String(user.profile_image)} alt="profile image" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-sm">{initials}</span>
                )}
              </div>
            </div>
          </div>

          {/* searchbar */}
          <div className="flex gap-x-4 w-full mb-4">
            <div className="bg-base-200 p-4 rounded-lg flex gap-2 items-center w-full flex-col sm:flex-row">
              <form className="flex items-center gap-2 flex-1 w-full" onSubmit={(e) => e.preventDefault()}>
                <label className="sr-only" htmlFor="search">
                  Recherche
                </label>
                <input
                  type="text"
                  onChange={handleSearch}
                  className="input input-bordered input-sm w-full max-w-full sm:max-w-xs"
                  name="search-input"
                  id="search"
                  placeholder="Recherche une transaction"
                />
                <button type="button" className="btn btn-accent btn-sm" onClick={() => { /* noop: search is handled onChange */ }}>
                  Rechercher
                </button>
              </form>

              <label className="sr-only" htmlFor="font-filter">
                Filter
              </label>
              <select
                name="filter"
                onChange={(e) => setRow(e.target.value)}
                id="font-filter"
                value={row}
                className="w-32 select select-ghost"
              >
                <option disabled={false}>Filter</option>
                <option>Nom</option>
                <option>Categories</option>
              </select>
            </div>
          </div>

          <div className="divider" />
        </div>

        {/* transaction list */}
        <div className="w-full flex-1 px-4 overflow-x-auto max-w-6xl">
          <TransactionList tlist={transactionList} cate={categories} />
        </div>
      </div>
    </div>
  );
}

