import { Form } from "react-router";
import "../index.css";
<<<<<<< HEAD
<<<<<<< HEAD
import type {
  Transaction,
  TransActionList,
  User,
  Category,
} from "../lib/service/dto";
import { useState } from "react";
import { useLoaderData } from "react-router";
=======
>>>>>>> ba2b695 (merge branches)
=======
>>>>>>> ba2b695 (merge branches)
import { TransactionList } from "../components/transactionList";
import SideBar from "../components/SideBar";

<<<<<<< HEAD
export function TransactionPage() {
  const {
    user,
    trans,
    categories,
  }: { user: User; trans: TransActionList; categories: Category[] } =
    useLoaderData();
  const [transactions, setTransactionList] = useState<Transaction[]>(
    trans.transactions,
  );
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      setTransactionList(trans.transactions);
      return;
    }
    if (row === "Nom" && query !== "") {
      setTransactionList(
        transactions.filter((t) => t.name.toLowerCase().includes(query)),
      );
    }
    if (row === "Categories" && query !== "") {
      setTransactionList(
        transactions.filter((t) =>
          t.category!.toString().toLowerCase().includes(query),
        ),
      );
    }
  };
  const [row, setRow] = useState("Nom");

  return (
    <div className="w-full h-screen bg-base-100 flex flex-col items-center justify-start gap-y-4">
      {/* headder*/}
      <div className="w-full flex flex-col items-left justify-between px-4">
        {/* title & profile */}
        <div className="w-full flex items-center justify-between py-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <div className=" flex items-center gap-x-2" id="avatar">
            <div className=" font-semibold">{user.name}</div>
            <div className="w-10 h-10 rounded-full">
              <img src={`${user.profile_image}`} alt="profile pic" />
            </div>
          </div>
        </div>
        {/* searchbar */}
        <div className="flex gap-x-4 w-full">
          <div className="bg-base-200 mb-4 p-4 rounded-lg flex gap-2">
            <Form
              className="flex justify-center items-center h-full w-auto gap-2"
              method="get"
              action="/transactions"
            >
              <label className="hidden" htmlFor="search">
                Recherche
              </label>
              <input
                type="text"
                onChange={handleSearch}
                className="input input-bordered input-xs sm:input-sm w-full max-w-xs"
                name="search-input"
                id="search"
                placeholder="Recherche une transaction"
              />
              <label className="hidden" htmlFor="font-filter">
                Select a font:
              </label>
              <select
                name="filter"
                onChange={(e) => setRow(e.target.value)}
                id="font-filter"
                defaultValue="Pick a font"
                className="w-32 select select-ghost"
              >
                <option disabled={true}>Filter</option>
                <option>Nom</option>
                <option>Categories</option>
              </select>
            </Form>
          </div>
        </div>
        <div className="divider"></div>
      </div>
      {/* transaction list */}
      <div className="w-full h-full px-4 overflow-y-auto">
        <TransactionList tlist={transactions} cate={categories} />
=======
const user = {
  name: "John Doe",
  imageUrl:
    "https://cdn.pixabay.com/photo/2023/05/02/10/35/avatar-7964945_1280.png",
};

export function TransactionPage() {
  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="flex-1 w-full h-screen bg-base-100 flex flex-col items-center justify-start gap-y-4">
        {/* headder*/}
        <div className="w-full flex flex-col items-left justify-between px-4">
          {/* title & profile */}
          <div className="w-full flex items-center justify-between py-6">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <div className=" flex items-center gap-x-2" id="avatar">
              <div className=" font-semibold">{user.name}</div>
              <div className="w-10 h-10 rounded-full">
                <img src={user.imageUrl} alt="profile pic" />
              </div>
            </div>
          </div>
          {/* searchbar */}
          <div className="flex gap-x-4 w-full">
            <div className="bg-base-200 mb-4 p-4 rounded-lg flex gap-2">
              <Form
                className="flex justify-center items-center h-full w-auto gap-2"
                method="get"
                action="/transactions"
              >
                <label className="hidden" htmlFor="search">
                  Recherche
                </label>
                <input
                  type="text"
                  className="input input-bordered input-xs sm:input-sm w-full max-w-xs"
                  name="search-input"
                  id="search"
                  placeholder="Recherche une transaction"
                />
                <input
                  type="submit"
                  className="btn btn-accent sm:input-sm btn-xs"
                  value={"Rechercher"}
                />
              </Form>
              <label className="hidden" htmlFor="font-filter">
                Select a font:
              </label>
              <select
                name="filter"
                id="font-filter"
                defaultValue="Pick a font"
                className=" w-24 select select-ghost"
              >
                <option disabled={false}>filter</option>
                <option>Nom</option>
                <option>Categories</option>
              </select>
            </div>
          </div>
          <div className="divider"></div>
        </div>
        {/* transaction list */}
        <div className="w-full h-full px-4 overflow-y-auto">
          <TransactionList />
        </div>
<<<<<<< HEAD
>>>>>>> ba2b695 (merge branches)
=======
>>>>>>> ba2b695 (merge branches)
      </div>
    </div>
  );
}
