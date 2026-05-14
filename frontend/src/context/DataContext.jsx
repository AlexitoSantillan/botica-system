import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({ children }) {

  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);

  const token = localStorage.getItem("token");

  const obtenerProductos = async () => {
    const res = await axios.get("http://localhost:5000/api/productos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProductos(res.data);
  };

  const obtenerVentas = async () => {
    const res = await axios.get("http://localhost:5000/api/ventas", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setVentas(res.data);
  };

  const recargarTodo = () => {
    obtenerProductos();
    obtenerVentas();
  };

  useEffect(() => {
    recargarTodo();
  }, []);

  return (
    <DataContext.Provider value={{
      productos,
      ventas,
      recargarTodo
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}