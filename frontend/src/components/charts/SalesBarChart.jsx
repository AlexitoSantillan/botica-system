import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function SalesBarChart({ data = [] }) {

  const safe = Array.isArray(data) ? data : [];

  // 1. AGRUPAR POR PRODUCTO (SIN HISTÓRICO TOTAL)
  const grouped = {};

  safe.forEach(v => {

    const name =
      typeof v.producto === "object"
        ? v.producto?.nombre
        : v.producto || "Producto";

    if (!grouped[name]) {
      grouped[name] = {
        nombre: name,
        cantidad: 0
      };
    }

    grouped[name].cantidad += v.cantidad || 0;
  });

  // 2. CONVERTIR A ARRAY
  const chartData = Object.values(grouped);

  // 3. ORDENAR (MÁS VENDIDOS PRIMERO)
  chartData.sort((a, b) => b.cantidad - a.cantidad);

  // 4. TOP 10
  const top10 = chartData.slice(0, 10);

  return (
    <div className="card">

      <h3>📊 Productos más vendidos (reciente)</h3>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={top10}>

            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="cantidad" fill="#3498db" />

          </BarChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default SalesBarChart;