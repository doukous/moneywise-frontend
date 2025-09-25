import { Form } from "react-router";
import "../index.css"
import { TransactionList } from "../components/transactionList";

const user = {
    name: "John Doe",
    imageUrl: "https://cdn.pixabay.com/photo/2023/05/02/10/35/avatar-7964945_1280.png"
}


export function TransactionPage() {
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
                            <input type="text" className="input input-bordered input-xs w-full max-w-xs" name="search-input" id="search" placeholder="Recherche une transaction" />
                            <input type="submit" className="btn btn-accent btn-xs" value={'Rechercher'} />
                        </Form>
                        <label className="hidden" htmlFor="font-filter">Select a font:</label>
                        <select name="filter" id="font-filter" defaultValue="Pick a font" className=" w-24 select select-ghost">
                            <option disabled={false}>filter</option>
                            <option>Nom</option>
                            <option>Categories</option>
                        </select>
                    </div>
                </div>
                <div className="divider" ></div>
            </div>
            {/* transaction list */}
            <div className="w-full h-full px-4 overflow-y-auto">
                <TransactionList />
            </div>
        </div>
    )
}