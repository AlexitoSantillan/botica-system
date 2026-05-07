import { useEffect, useState } from "react";
import axios from "axios";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import SaleForm from "./components/SaleForm";
import SalesList from "./components/SalesList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsChart from "./components/StatsChart";
import ExportPDF from "./components/ExportPDF";

import "./App.css";

function App() {

  const [productos, setProductos] =
    useState([]);

  const [autenticado, setAutenticado] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const obtenerProductos = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/productos"
    );

    setProductos(res.data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  if (!autenticado) {
    return (
      <Login
        setAutenticado={setAutenticado}
      />
    );
  }

  return (
    <div
      className={
        darkMode
          ? "container dark"
          : "container"
      }
    >

      <Navbar
        setAutenticado={setAutenticado}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <h1 className="titulo">
        Sistema de Botica
      </h1>

      <Dashboard productos={productos} />

      <div className="card">
        <ExportPDF productos={productos} />
      </div>

      <div className="card">
        <StatsChart productos={productos} />
      </div>

      <div className="card">
        <ProductForm 
        obtenerProductos={obtenerProductos}/>
      </div>

      <div className="card">
        <SaleForm />
      </div>

      <div className="card">
        <SalesList />
      </div>

      <div className="card">
        <ProductList
          productos={productos}
          obtenerProductos={obtenerProductos}
        />
      </div>

      <Footer />

    </div>
  );
}

export default App;