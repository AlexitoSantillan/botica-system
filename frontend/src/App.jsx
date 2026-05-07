import { useState } from "react";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import SaleForm from "./components/SaleForm";
import SalesList from "./components/SalesList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {

  const [productos, setProductos] =
    useState([]);

  const [autenticado, setAutenticado] =
    useState(false);

  if (!autenticado) {
    return (
      <Login
        setAutenticado={setAutenticado}
      />
    );
  }

  return (
    <div className="container">

      <Navbar
        setAutenticado={setAutenticado}
      />

      <h1 className="titulo">
        Sistema de Botica
      </h1>

      <Dashboard productos={productos} />

      <div className="card">
        <ProductForm />
      </div>

      <div className="card">
        <SaleForm />
      </div>

      <div className="card">
        <SalesList />
      </div>

      <div className="card">
        <ProductList
          setProductosGlobal={setProductos}
        />
      </div>

      <Footer />

    </div>
  );
}

export default App;