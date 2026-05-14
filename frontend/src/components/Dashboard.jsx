function Dashboard({
  productos = [],
  ventas = [],
  stockBajo = 0,
  porVencer = 0,
  ingresos = 0
}) {

  const totalProductos = productos.length;
  const totalVentas = ventas.length;

  return (
    <div className="dashboard">

      <div className="card-dashboard">
        <h3>📦 Productos</h3>
        <p>{totalProductos}</p>
      </div>

      <div className="card-dashboard">
        <h3>⚠️ Stock Bajo</h3>
        <p>{stockBajo}</p>
      </div>

      <div className="card-dashboard">
        <h3>⏰ Por Vencer</h3>
        <p>{porVencer}</p>
      </div>

      <div className="card-dashboard">
        <h3>💰 Ventas</h3>
        <p>{totalVentas}</p>
      </div>

      <div className="card-dashboard">
        <h3>🧾 Ingresos</h3>
        <p>S/. {ingresos.toFixed(2)}</p>
      </div>

    </div>
  );
}

export default Dashboard;