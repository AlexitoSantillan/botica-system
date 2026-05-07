function Dashboard({ productos }) {

  const totalProductos = productos.length;

  const stockBajo = productos.filter(
    (p) => p.stock < 5
  ).length;

  const proximosVencer = productos.filter((p) => {
    return (
      new Date(p.fechaVencimiento) <
      new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      )
    );
  }).length;

  return (
    <div className="dashboard">

      <div className="card-dashboard">
        <h3>Total Productos</h3>
        <p>{totalProductos}</p>
      </div>

      <div className="card-dashboard">
        <h3>Stock Bajo</h3>
        <p>{stockBajo}</p>
      </div>

      <div className="card-dashboard">
        <h3>Próximos a Vencer</h3>
        <p>{proximosVencer}</p>
      </div>

    </div>
  );
}

export default Dashboard;