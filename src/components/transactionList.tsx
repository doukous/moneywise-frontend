import type { Transaction } from "../lib/service/dto"

const transactions: Transaction[] = [
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

export function TransactionList() {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra" >
            <thead>
                <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>Montant</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Catégories</th>
                </tr>
            </thead>
            <tbody className="divide-y text-left">
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <th>{transaction.id}</th>
                        <td>{transaction.name}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.type === "expense"? 
                            <span className="badge badge-error badge-soft">Depense</span> : 
                            <span className="badge badge-success badge-soft">Revenu</span>}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.category.join(", ")}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}