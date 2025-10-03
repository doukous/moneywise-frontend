import React, { useState, useEffect } from "react";
import type { Transaction } from "../lib/service/dto";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import SideBar from "../components/SideBar";

const Reports: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyReport, setMonthlyReport] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  useEffect(() => {
    const savedTransactions = sessionStorage.getItem("transactions");

    if (savedTransactions) {
      try {
        const parsed: Transaction[] = JSON.parse(savedTransactions);
        setTransactions(parsed);

        const income = parsed
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + (t.amount ?? 0), 0);

        const expense = parsed
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + (t.amount ?? 0), 0);

        setMonthlyReport({
          income,
          expense,
          balance: income - expense,
        });

        setLoading(false);
      } catch (e) {
        console.error("Erreur lors de la lecture des données :", e);
        setError("Erreur lors de la lecture des données.");
        setLoading(false);
      }
    } else {
      setError("Aucune donnée trouvée. Veuillez d'abord visiter la page Transactions.");
      setLoading(false);
    }
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport Mensuel des Transactions", 20, 20);
    let y = 30;

    transactions.forEach((t) => {
      doc.text(
        `${t.date} - ${t.category_name || t.category} - ${t.type} - ${t.amount} CFA`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Total Revenu: ${monthlyReport.income} CFA`, 20, y + 10);
    doc.text(`Total Dépenses: ${monthlyReport.expense} CFA`, 20, y + 20);
    doc.text(`Solde: ${monthlyReport.balance} CFA`, 20, y + 30);
    doc.save("rapport_transactions.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "rapport_transactions.xlsx");
  };

  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <div className="flex-1 p-6 space-y-6 h-screen overflow-y-scroll">
        <h1 className="text-2xl font-bold text-base-content">
          Rapports Financiers
        </h1>
        <p className="text-base-content/60">
          Exportez vos transactions en PDF ou Excel
        </p>

        {/* Résumé */}
        <div className="bg-base-200 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-lg font-bold text-success">
              {monthlyReport.income.toLocaleString()} CFA
            </div>
            <div className="text-sm text-base-content/70">Revenus</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-error">
              {monthlyReport.expense.toLocaleString()} CFA
            </div>
            <div className="text-sm text-base-content/70">Dépenses</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-info">
              {monthlyReport.balance.toLocaleString()} CFA
            </div>
            <div className="text-sm text-base-content/70">Solde</div>
          </div>
        </div>

        {/* Boutons d'export */}
        <div className="flex gap-4">
          <button onClick={exportPDF} className="btn btn-error text-white">
            Exporter en PDF
          </button>
          <button onClick={exportExcel} className="btn btn-success text-white">
            Exporter en Excel
          </button>
        </div>

        {/* Table des transactions */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-base-content/70">
              Chargement des données...
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="text-base-content/70">
              Aucune transaction trouvée.
            </div>
          ) : (
            <table className="table table-zebra w-full mt-4">
              <thead>
                <tr className="text-base-content">
                  <th>Date</th>
                  <th>Catégorie</th>
                  <th>Type</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{new Date(t.date).toLocaleDateString()}</td>
                    <td>{t.category_name || (typeof t.category === "string" ? t.category : t.category?.name)}</td>
                    <td>
                      <span
                        className={`badge ${
                          t.type === "income" ? "badge-success" : "badge-error"
                        } text-white`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td>{t.amount?.toLocaleString()} CFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
