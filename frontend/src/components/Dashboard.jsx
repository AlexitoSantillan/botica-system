import { useMemo } from "react";

function Dashboard({ productos = [], ventas = [] }) {

  const stats = useMemo(() => {

    // Total productos
    const totalProductos = productos.length;

    // Stock bajo
    const stockBajo = productos.filter(
      (p) => (p.stock ?? 0) < 5
    ).length;

    // Próximos a vencer (30 días)
    const proximosVencer = productos.filter((p) => {
      if (!p.fechaVencimiento) return false;

      const hoy = new Date();
      const vencimiento = new Date(p.fechaVencimiento);

      const dias =
        (vencimiento.getTime() - hoy.getTime()) /
        (1000 * 60 * 60 * 24);

      return dias > 0 && dias <= 30;
    }).length;

    // Total ventas
    const totalVentas = ventas.length;

    // Ingresos totales
    const ingresosTotales = ventas.reduce(
      (acc, v) => acc + (v.total ?? 0),
      0
    );

    return {
      totalProductos,
      stockBajo,
      proximosVencer,
      totalVentas,
      ingresosTotales
    };

  }, [productos, ventas]);

  return (
    <div className="dashboard">

      <div className="card-dashboard">
        <h3>📦 Productos</h3>
        <p>{stats.totalProductos}</p>
      </div>

      <div className="card-dashboard">
        <h3>⚠️ Stock Bajo</h3>
        <p>{stats.stockBajo}</p>
      </div>

      <div className="card-dashboard">
        <h3>⏰ Por Vencer</h3>
        <p>{stats.proximosVencer}</p>
      </div>

      <div className="card-dashboard">
        <h3>💰 Ventas</h3>
        <p>{stats.totalVentas}</p>
      </div>

      <div className="card-dashboard">
        <h3>🧾 Ingresos</h3>
        <p>S/. {stats.ingresosTotales.toFixed(2)}</p>
      </div>

    </div>
  );
}

export default Dashboard;