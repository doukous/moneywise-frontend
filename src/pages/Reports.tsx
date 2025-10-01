// src/components/Reports.tsx
import React, { useEffect, useState } from "react";
import { TransactionService } from "../lib/service/transaction";
import type { Transaction } from "../lib/service/dto"; // ✅ Typage venant du dto
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const Reports: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyReport, setMonthlyReport] = useState<{
    income: number;
    expense: number;
    balance: number;
  }>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Charger les transactions depuis le backend
  useEffect(() => {
    TransactionService.getAll()
      .then((data) => {
        setTransactions(data);

        // Calcul rapide du rapport
        const income = data
          .filter((t: Transaction) => t.type === "income")
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
        const expense = data
          .filter((t: Transaction) => t.type === "expense")
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

        setMonthlyReport({
          income,
          expense,
          balance: income - expense,
        });
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des transactions :", err),
      );
  }, []);

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport Mensuel des Transactions", 20, 20);
    let y = 30;
    transactions.forEach((t) => {
      doc.text(
        `${t.date} - ${t.category} - ${t.type} - ${t.amount} CFA`,
        20,
        y,
      );
      y += 10;
    });
    doc.text(`Total Revenu: ${monthlyReport.income} CFA`, 20, y + 10);
    doc.text(`Total Dépenses: ${monthlyReport.expense} CFA`, 20, y + 20);
    doc.text(`Solde: ${monthlyReport.balance} CFA`, 20, y + 30);
    doc.save("rapport_transactions.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "rapport_transactions.xlsx");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Rapports Financiers</h1>
      <p className="text-gray-600">Exportez vos transactions en PDF ou Excel</p>

      {/* Résumé */}
      <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {monthlyReport.income} CFA
          </div>
          <div className="text-sm text-gray-500">Revenus</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">
            {monthlyReport.expense} CFA
          </div>
          <div className="text-sm text-gray-500">Dépenses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {monthlyReport.balance} CFA
          </div>
          <div className="text-sm text-gray-500">Solde</div>
        </div>
      </div>

      {/* Boutons Export */}
      <div className="flex space-x-4">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Exporter en PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Exporter en Excel
        </button>
      </div>
    </div>
  );
};

export default Reports;
