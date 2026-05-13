import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import DashboardPage from "./pages/DashboardPage";
import ProductosPage from "./pages/ProductosPage";
import VentasPage from "./pages/VentasPage";
import ReportesPage from "./pages/ReportesPage";
import SoportePage from "./pages/SoportePage";

import "./App.css";

function App() {

  const [productos, setProductos] =
    useState([]);

  const [ventas, setVentas] =
    useState([]);

  const [autenticado, setAutenticado] =
    useState(
      localStorage.getItem("token")
        ? true
        : false
    );

  const [darkMode, setDarkMode] =
    useState(false);

  const [vista, setVista] =
    useState("inicio");

  // ===== OBTENER PRODUCTOS =====

  const obtenerProductos = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/productos",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setProductos(res.data);

    } catch (error) {

      console.log(
        "Error al obtener productos",
        error
      );

    }

  };

  // ===== OBTENER VENTAS =====

  const obtenerVentas = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/ventas",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setVentas(res.data);

    } catch (error) {

      console.log(
        "Error al obtener ventas",
        error
      );

    }

  };

  // ===== USE EFFECT =====

  useEffect(() => {

    obtenerProductos();

    obtenerVentas();

  }, []);

  // ===== LOGIN =====

  if (!autenticado) {

    return (
      <Login
        setAutenticado={
          setAutenticado
        }
      />
    );

  }

  // ===== RETURN =====

  return (

    <div
      className={
        darkMode
          ? "container dark"
          : "container"
      }
    >

      <Navbar
        setAutenticado={
          setAutenticado
        }
        darkMode={darkMode}
        setDarkMode={
          setDarkMode
        }
        setVista={setVista}
      />

      <h1 className="titulo">
        Sistema de Botica
      </h1>

      {/* ===== INICIO ===== */}

      {vista === "inicio" && (

        <DashboardPage
          productos={productos}
          ventas={ventas}
        />

      )}

      {/* ===== PRODUCTOS ===== */}

      {vista === "productos" && (

        <ProductosPage
          productos={productos}
          obtenerProductos={
            obtenerProductos
          }
        />

      )}

      {/* ===== VENTAS ===== */}

      {vista === "ventas" && (

        <VentasPage
          obtenerProductos={
            obtenerProductos
          }
        />

      )}

      {/* ===== REPORTES ===== */}

      {vista === "reportes" && (

        <ReportesPage
          productos={productos}
        />

      )}

      {/* ===== SOPORTE ===== */}

      {vista === "soporte" && (

        <SoportePage />

      )}

      <Footer />

    </div>

  );

}

export default App;