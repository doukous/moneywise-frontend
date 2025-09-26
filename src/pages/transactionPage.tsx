import { Form } from "react-router";
import "../index.css"
import { TransactionList } from "../components/transactionList";
import type { Transaction } from "../lib/service/dto";
import { useState } from "react";

const user = {
    name: "John Doe",
    imageUrl: "https://cdn.pixabay.com/photo/2023/05/02/10/35/avatar-7964945_1280.png"
}

const trans: Transaction[] = [
    {
        id: "1",
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

const getCategories = (transations: Transaction[]) => {
    //take categories from Transaction List
    const categories = new Set<string>();
    transations.forEach(t => t.category.forEach(c => categories.add(c)));
    console.log(Array.from(categories));
}



export function TransactionPage() {
    const [transactions, setTransactionList] = useState<Transaction[]>(trans);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if ( row === "Nom" && query !== "") {
        setTransactionList(transactions.filter(t => t.name.toLowerCase().includes(query)));
        }
        if ( row === "Categories" && query !== "") {
            setTransactionList(transactions.filter(t => t.category.some(c => c.toLowerCase().includes(query))));
        }
    }
    getCategories(transactions);
    const [row, setRow] = useState("Nom");
    const resetTransactions = () => {
        setTransactionList(trans);
    }
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
                            <img src={user.imageUrl} alt="profile pic" />
                        </div>
                    </div>
                </div>
                {/* searchbar */}
                <div className="flex gap-x-4 w-full">
                    <div className="bg-base-200 mb-4 p-4 rounded-lg flex gap-2">
                        <Form className="flex justify-center items-center h-full w-auto gap-2" method="get" action="/transactions">
                            <label className="hidden" htmlFor="search">Recherche</label>
                            <input type="text" onChange={handleSearch} className="input input-bordered input-xs sm:input-sm w-full max-w-xs" name="search-input" id="search" placeholder="Recherche une transaction" />
                        <label className="hidden" htmlFor="font-filter">Select a font:</label>
                        <select name="filter" onChange={(e) => setRow(e.target.value)} id="font-filter" defaultValue="Pick a font" className="w-32 select select-ghost">
                            <option disabled={true}>Filter</option>
                            <option>Nom</option>
                            <option>Categories</option>
                        </select>
                        <button  onClick={resetTransactions} className="btn btn-soft btn-warning">
                            reset
                        </button>
                        </Form>
                    </div>
                </div>
                <div className="divider" ></div>
            </div>
            {/* transaction list */}
            <div className="w-full h-full px-4 overflow-y-auto">
                <TransactionList tlist={transactions} />
            </div>
        </div>
    )
}