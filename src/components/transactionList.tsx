import type { Transaction } from "../lib/service/dto"

export function TransactionList({ tlist }: { tlist: Transaction[] }) {
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
                {tlist.map((transaction) => (
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