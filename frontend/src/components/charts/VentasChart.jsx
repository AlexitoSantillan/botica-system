import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function VentasChart({ ventas = [] }) {

  const safe = Array.isArray(ventas) ? ventas : [];

  // =========================
  // AGRUPAR POR MES (FIX PRO)
  // =========================
  const data = (() => {

    const map = {};

    safe.forEach(v => {

      const fecha = new Date(v.fecha);

      if (isNaN(fecha.getTime())) return;

      const key = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

      if (!map[key]) {
        map[key] = {
          mes: key,
          total: 0
        };
      }

      map[key].total += v.total || 0;
    });

    return Object.values(map).sort((a, b) => {
      const [ay, am] = a.mes.split("-").map(Number);
      const [by, bm] = b.mes.split("-").map(Number);
      return ay === by ? am - bm : ay - by;
    });

  })();

  return (
    <div className="card">

      <h3>📈 Ventas por mes</h3>

      <div className="chart-wrapper">

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#2196f3"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default VentasChart;