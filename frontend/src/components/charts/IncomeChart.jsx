import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function IncomeChart({ data = [] }) {

  const safe = Array.isArray(data) ? data : [];

  const chartData = useMemo(() => {

    const map = {};

    safe.forEach(v => {

      const date = v.fecha;
      if (!date) return;

      const key = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
      ].join("-");

      if (!map[key]) {
        map[key] = { fecha: key, total: 0 };
      }

      map[key].total += Number(v.total) || 0;
    });

    return Object.values(map)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

  }, [safe]);

  return (
    <div className="card">

      <h3>💰 Ingresos</h3>

      <div className="chart-wrapper">

        <ResponsiveContainer width="100%" height={300}>

          <AreaChart data={chartData}>

            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#2ecc71"
              fill="#2ecc71"
              fillOpacity={0.3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default IncomeChart;