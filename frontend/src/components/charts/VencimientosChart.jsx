import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function VencimientosChart({ productos = [] }) {

  const safe = Array.isArray(productos) ? productos : [];

  const data = useMemo(() => {

    let menos1Mes = 0;
    let mas1Mes = 0;

    safe.forEach(p => {

      if (!p.fechaVencimiento) return;

      const fecha = new Date(p.fechaVencimiento);

      if (isNaN(fecha.getTime())) return;

      const dias =
        (fecha.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

      if (dias <= 30) {
        menos1Mes++;
      } else {
        mas1Mes++;
      }
    });

    return [
      { name: "Menos de 1 mes", value: menos1Mes },
      { name: "Más de 1 mes", value: mas1Mes }
    ];

  }, [safe]);

  const COLORS = ["#e74c3c", "#3498db"]; // rojo, azul

  return (
    <div className="card">

      <h3>⚠️ Vencimientos</h3>

      <div className="chart-wrapper">

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default VencimientosChart; 