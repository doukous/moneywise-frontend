import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TransactionsLineChartProps {
  data: ChartData<"line", (number | null)[], string>;
  year: number;
}

export default function TransactionsLineChart({
  data,
  year,
}: TransactionsLineChartProps) {
  return (
    <div className="w-full flex flex-col items-center gap-y-2 p-4 border border-gray-300 rounded-2xl mt-4">
      <h2 className="text-2xl font-bold">
        Évolution des transactions sur l'année {year}
      </h2>
      <div className="w-full max-w-4xl h-64 md:h-96">
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
          data={data}
        />
      </div>
    </div>
  );
}
