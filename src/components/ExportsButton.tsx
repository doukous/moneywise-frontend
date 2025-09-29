// src/components/ExportButtons.tsx
import React from "react";
import type { Transaction } from "../lib/service/dto";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

interface ExportButtonsProps {
  transactions: Transaction[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ transactions }) => {
  // ✅ Export en PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport des transactions", 14, 16);

    const tableData = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      `${t.amount} FCFA`,
    ]);

    // ✅ Utilisation de autoTable
    doc.autoTable({
      head: [["Date", "Description", "Catégorie", "Type", "Montant"]],
      body: tableData,
      startY: 20,
    });

    doc.save("transactions.pdf");
  };

  // ✅ Export en Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  return (
    <div className="flex space-x-4 mt-4">
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
  );
};

export default ExportButtons;
