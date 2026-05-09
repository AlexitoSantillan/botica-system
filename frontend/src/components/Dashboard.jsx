function Dashboard({ productos = [] }) {

  const totalProductos =
    productos.length;

  const stockBajo =
    productos.filter(
      (p) => p.stock < 5
    ).length;

  const proximosVencer =
    productos.filter((p) => {

      const hoy = new Date();

      const vencimiento =
        new Date(p.fechaVencimiento);

      const diferencia =
        (vencimiento - hoy) /
        (1000 * 60 * 60 * 24);

      return diferencia <= 30;

    }).length;

  return (

    <div className="dashboard">

      <div className="card-dashboard">
        <h3>Productos Totales</h3>
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