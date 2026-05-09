import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function StatsChart({
  productos = []
}) {

  const stockBajo =
    productos.filter(
      (p) => p.stock < 5
    ).length;

  const stockNormal =
    productos.filter(
      (p) => p.stock >= 5
    ).length;

  const data = {

    labels: [
      "Stock Bajo",
      "Stock Normal"
    ],

    datasets: [
      {
        label: "Productos",

        data: [
          stockBajo,
          stockNormal
        ],

        backgroundColor: [
          "red",
          "#3498db"
        ],

        borderWidth: 1
      }
    ]
  };

  return (

    <div
      style={{
        width: "400px",
        margin: "auto"
      }}
    >

      <h2
        style={{
          textAlign: "center"
        }}
      >
        Estadísticas
      </h2>

      <Pie data={data} />

    </div>
  );
}

export default StatsChart;