import { useEffect, useState } from "react";
import axios from "axios";

function SaleForm() {

  const [productos, setProductos] = useState([]);

  const [venta, setVenta] = useState({
    productoId: "",
    cantidad: ""
  });

  const obtenerProductos = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/productos",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProductos(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleChange = (e) => {

    setVenta({
      ...venta,
      [e.target.name]: e.target.value
    });

  };

  const registrarVenta = async (e) => {

    e.preventDefault();

    if (!venta.productoId || !venta.cantidad) {

      alert("Completa todos los campos");
      return;

    }

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/ventas",
        {
          productoId: venta.productoId,
          cantidad: Number(venta.cantidad)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Venta registrada");

      setVenta({
        productoId: "",
        cantidad: ""
      });

      obtenerProductos();

    } catch (error) {

      alert(
        error.response?.data?.mensaje ||
        "Error al registrar venta"
      );

    }

  };

  return (

    <div>

      <h2>Registrar Venta</h2>

      <form onSubmit={registrarVenta}>

        <select
          name="productoId"
          value={venta.productoId}
          onChange={handleChange}
        >

          <option value="">
            Seleccionar Producto
          </option>

          {productos.map((producto) => (

            <option
              key={producto._id}
              value={producto._id}
            >
              {producto.nombre} - Stock:
              {producto.stock}
            </option>

          ))}

        </select>

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={venta.cantidad}
          onChange={handleChange}
        />

        <button type="submit">
          Vender
        </button>

      </form>

    </div>

  );

}

export default SaleForm;