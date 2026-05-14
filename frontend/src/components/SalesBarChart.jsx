import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesBarChart({ data = [] }) {

  const labels = data.map(v =>
    typeof v.producto === "object"
      ? v.producto?.nombre
      : v.producto || "Producto"
  );

  const cantidades = data.map(v => v.cantidad);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: cantidades,
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#f39c12",
          "#9b59b6",
          "#e74c3c"
        ],
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Historial de Ventas"
      }
    }
  };

  return (
    <div className="card" style={{ height: 320 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default SalesBarChart;