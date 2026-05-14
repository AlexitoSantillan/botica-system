import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import Dashboard from "../components/Dashboard";

import StatsChart from "../components/charts/StatsChart";
import SalesBarChart from "../components/charts/SalesBarChart";
import IncomeChart from "../components/charts/IncomeChart";
import VencimientosChart from "../components/charts/VencimientosChart";

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

        setProductos(resProductos.data || []);
        setVentas(resVentas.data || []);

      } catch (error) {
        console.log("Error dashboard:", error);
        setProductos([]);
        setVentas([]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();

  }, []);

  // =========================
  // KPI
  // =========================

  const stockBajo = productos.filter(p => (p.stock || 0) < 5).length;

  const porVencer = productos.filter(p => {
    if (!p.fechaVencimiento) return false;

    const dias =
      (new Date(p.fechaVencimiento).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24);

    return dias <= 30;
  }).length;

  const ingresos = ventas.reduce((acc, v) => acc + (v.total || 0), 0);

  // =========================
  // NORMALIZAR FECHAS
  // =========================

  const ventasNormalizadas = useMemo(() => {
    return ventas.map(v => ({
      ...v,
      fecha: v.fecha ? new Date(v.fecha) : null
    }));
  }, [ventas]);

  if (loading) {
    return <div className="dashboard-loading">Cargando dashboard...</div>;
  }

  return (
    <div className="dashboard-container">

      {/* 🖨️ BOTÓN IMPRIMIR */}
      <button
        className="no-print"
        onClick={() => window.print()}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
          background: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        🖨️ Imprimir Dashboard
      </button>

      {/* KPI */}
      <Dashboard
        productos={productos}
        ventas={ventas}
        stockBajo={stockBajo}
        porVencer={porVencer}
        ingresos={ingresos}
      />

      {/* CHARTS */}
      <div className="dashboard-grid">

        <StatsChart data={ventasNormalizadas} />

        <IncomeChart data={ventasNormalizadas} />

        <SalesBarChart data={ventasNormalizadas} />

        <VencimientosChart productos={productos} />

      </div>

    </div>
  );
}

export default DashboardPage;