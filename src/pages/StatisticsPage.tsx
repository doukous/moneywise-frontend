import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  PieChart,
} from "recharts";
import SideBar from "../components/SideBar";

export default function StatisticsPage() {
  const areaData = [
    {
      name: "Janvier",
      dépenses: 4000,
      revenus: 2400,
    },
    {
      name: "Février",
      dépenses: 3000,
      revenus: 1398,
    },
    {
      name: "Mars",
      dépenses: 2000,
      revenus: 9800,
    },
    {
      name: "Avril",
      dépenses: 2780,
      revenus: 3908,
    },
    {
      name: "Mai",
      dépenses: 1890,
      revenus: 4800,
    },
    {
      name: "Juin",
      dépenses: 2390,
      revenus: 3800,
    },
  ];

  const pieChart = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex-1 h-screen flex flex-col justify-center items-center gap-y-4">
        <AreaChart
          width={500}
          height={300}
          data={areaData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenus"
            stroke="#8884d8"
            fill="#8884d8"
            activeDot={{ r: 2 }}
          />
          <Area
            type="monotone"
            dataKey="dépenses"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </div>
    </div>
  );
}
