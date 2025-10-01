import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IncomePieChartProps {
  data: ChartData<"pie", number[], string>;
}

export default function IncomePieChart({ data }: IncomePieChartProps) {
  return (
    <div className="w-full lg:w-1/3 flex flex-col items-center gap-y-4 p-4 border border-gray-300 rounded-2xl">
      <h2 className="text-2xl font-bold">
        Répartition des revenus par catégorie
      </h2>
      <div className="w-full h-auto aspect-square max-w-sm">
        <Pie data={data} />
      </div>
    </div>
  );
}
