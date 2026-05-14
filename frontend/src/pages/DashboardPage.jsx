import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "../components/Dashboard";
import StatsChart from "../components/StatsChart";
import SalesBarChart from "../components/SalesBarChart";

function DashboardPage() {

  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const cargarDatos = async () => {
      try {

        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const [resProductos, resVentas] = await Promise.all([
          axios.get("http://localhost:5000/api/productos", config),
          axios.get("http://localhost:5000/api/ventas", config)
        ]);

        setProductos(resProductos.data);
        setVentas(resVentas.data);

      } catch (error) {
        console.log("Error dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();

  }, []);

  const ventasData = ventas.map(v => ({
    fecha: new Date(v.fecha).toLocaleDateString(),
    total: v.total
  }));

  return (
    <div className="container">

      <Dashboard
        productos={productos}
        ventas={ventas}
        loading={loading}
      />

      <StatsChart
        data={ventasData}
        title="📈 Ventas"
      />

      <SalesBarChart
        data={ventas}
      />

    </div>
  );
}

export default DashboardPage;