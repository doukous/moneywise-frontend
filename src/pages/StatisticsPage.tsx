import { useMemo, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import IncomePieChart from "../components/IncomePieChart";
import ExpensePieChart from "../components/ExpensePieChart";
import TransactionsLineChart from "../components/TransactionsLineChart";
import { StatsService } from "../lib/service/stats";
import { TransactionService } from "../lib/service/transaction";
import type { CategoryStats, Transaction } from "../lib/service/dto";

const backgroundColors = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
  "rgba(199, 199, 199, 0.5)",
  "rgba(83, 102, 255, 0.5)",
  "rgba(255, 99, 86, 0.5)",
];

const borderColors = backgroundColors.map((color) =>
  color.replace("0.5", "1")
);

export default function StatisticsPage() {
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [catRes, transactionsData] = await Promise.all([
          StatsService.getCategoryStats(),
          TransactionService.getAll(),
        ]);
        setCategoryStats(catRes.stats_by_category || {});
        setTransactions(transactionsData.transactions || []);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const years = useMemo(() => {
    if (transactions.length === 0) return [new Date().getFullYear()];
    const yearsSet = new Set(
      transactions.map((t) => new Date(t.date).getFullYear())
    );
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [transactions]);

  const pieChartData = useMemo(() => {
    const incomeLabels = Object.keys(categoryStats).filter(cat => categoryStats[cat].income > 0);
    const incomeData = incomeLabels.map(cat => categoryStats[cat].income);

    const expenseLabels = Object.keys(categoryStats).filter(cat => categoryStats[cat].expense > 0);
    const expenseData = expenseLabels.map(cat => categoryStats[cat].expense);

    return {
        income: {
            labels: incomeLabels,
            datasets: [{
                label: "Somme totale",
                data: incomeData,
                backgroundColor: incomeLabels.map((_, i) => backgroundColors[i % backgroundColors.length]),
                borderColor: incomeLabels.map((_, i) => borderColors[i % borderColors.length]),
                borderWidth: 1,
            }]
        },
        expense: {
            labels: expenseLabels,
            datasets: [{
                label: "Somme totale",
                data: expenseData,
                backgroundColor: expenseLabels.map((_, i) => backgroundColors[i % backgroundColors.length]),
                borderColor: expenseLabels.map((_, i) => borderColors[i % borderColors.length]),
                borderWidth: 1,
            }]
        }
    }
  }, [categoryStats]);

  const lineChartData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => i);
    const incomeByMonth = Array(12).fill(0);
    const expenseByMonth = Array(12).fill(0);

    transactions.forEach((t) => {
        const d = new Date(t.date);
        if (d.getFullYear() === selectedYear) {
            const month = d.getMonth();
            if (t.type === 'income') {
                incomeByMonth[month] += t.amount;
            } else {
                expenseByMonth[month] += t.amount;
            }
        }
    });

    return {
      labels: months.map((m) =>
        new Date(selectedYear, m).toLocaleString("fr-FR", { month: "long" })
      ),
      datasets: [
        {
          fill: true,
          label: "Revenu mensuel",
          data: incomeByMonth,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          fill: true,
          label: "Dépense mensuelle",
          data: expenseByMonth,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [transactions, selectedYear]);

  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="w-full h-screen pb-24 overflow-y-scroll">
        <h1 className="p-8 font-bold text-3xl">Statistiques</h1>

        <div className="px-8 pb-4 flex flex-wrap items-center gap-4">
          <div className="form-control">
            <label htmlFor="year-select" className="label">
              <span className="label-text">Année</span>
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="select select-bordered"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center p-8">Chargement des données...</div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">Erreur: {error}</div>
        ) : (
          <div className="flex justify-center flex-wrap gap-4 p-4">
            <IncomePieChart data={pieChartData.income} />
            <ExpensePieChart data={pieChartData.expense} />
            <TransactionsLineChart data={lineChartData} year={selectedYear} />
          </div>
        )}
      </div>
    </div>
  );
}
