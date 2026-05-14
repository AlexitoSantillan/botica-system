import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function StatsChart({ data = [] }) {

  const [filtro, setFiltro] = useState("7d");

  const safe = Array.isArray(data) ? data : [];

  // =========================
  // FILTRO POR FECHA
  // =========================
  const filtradas = useMemo(() => {

    const ahora = new Date();
    let desde = new Date();

    switch (filtro) {

      case "7d":
        desde.setDate(ahora.getDate() - 7);
        break;

      case "30d":
        desde.setDate(ahora.getDate() - 30);
        break;

      case "mes":
        desde = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        break;

      case "año":
        desde = new Date(ahora.getFullYear(), 0, 1);
        break;

      default:
        desde.setDate(ahora.getDate() - 7);
    }

    return safe.filter(v => {
      const fecha = new Date(v.fecha);

      if (isNaN(fecha.getTime())) return false;

      return fecha >= desde && fecha <= ahora;
    });

  }, [safe, filtro]);

  // =========================
  // AGRUPAR POR DÍA (FIX FINAL REAL)
  // =========================
  const chartData = useMemo(() => {

    const map = {};

    filtradas.forEach(v => {

      const date = new Date(v.fecha);

      if (isNaN(date.getTime())) return;

      // 🔥 clave estable sin timezone issues
      const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      if (!map[key]) {
        map[key] = {
          fecha: key,
          total: 0
        };
      }

      map[key].total += v.total || 0;
    });

    return Object.values(map)
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  }, [filtradas]);

  return (
    <div className="card">

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <h3>📈 Ventas por fecha</h3>

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="mes">Este mes</option>
          <option value="año">Este año</option>
        </select>

      </div>

      {/* CHART */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#4caf50"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default StatsChart;