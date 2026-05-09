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

function SalesBarChart({ ventas = [] }) {

  const labels = ventas.map(
    (venta) =>
      venta.producto?.nombre || "Producto"
  );

  const cantidades = ventas.map(
    (venta) => venta.cantidad
  );

  const data = {
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

      legend: {
        position: "top"
      },

      title: {
        display: true,
        text: "Historial de Ventas"
      }

    }

  };

  return (

    <div className="card">

      <Bar
        data={data}
        options={options}
      />

    </div>

  );

}

export default SalesBarChart;