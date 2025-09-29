import SideBar from "../components/SideBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Filler, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement, 
  Tooltip, 
  Legend
);

const dataDepenses = {
  labels: [
    "Salaire",
    "Services",
    "Freelancing",
    "Cadeau / Dons",
  ],
  datasets: [
    {
      label: "Somme totale",
      data: [300000, 70000, 150000, 27000],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const dataRevenus = {
  labels: [
    "Nourriture",
    "Electricité",
    "Eau",
    "Box Internet",
    "Imprevus",
    "Médicaments",
  ],
  datasets: [
    {
      label: "Somme totale",
      data: [50000, 75000, 4500, 21000, 35000, 17000],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Julliet', 'Aout', 'Septembre'];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  tension: 0.3
};

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Revenu mensuel',
      data: labels.map(() => faker.number.int({ min: 300000, max: 500000, multipleOf: 500 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      fill: true,
      label: 'Dépense mensuelle',
      data: labels.map(() => faker.number.int({ min: 200000, max: 600000, multipleOf: 500 })),
      borderColor: 'rgb(140, 250, 214)',
      backgroundColor: 'rgba(140, 250, 214, 0.5)',
    },
  ],
};

export default function StatisticsPage() {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 h-screen flex flex-wrap items-center gap-y-8 overflow-y-auto">
        <div className="w-1/2 flex flex-col items-center gap-y-4">
          <div className="size-72">
            <Pie data={dataDepenses} />
          </div>
          <span>Répartiton par catégorie des revenus</span>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-y-4">
          <div className="size-72">
            <Pie data={dataRevenus} />
          </div>
          <span>Répartiton par catégorie des dépenes</span>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-y-2">
          <div className="w-128 h-64">
            <Line options={options} data={data} />
          </div>
          <span>Répartiton des transactions sur l'année</span>
        </div>
      </div>
    </div>
  );
}
