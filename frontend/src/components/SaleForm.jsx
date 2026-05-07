import { useEffect, useState } from "react";
import axios from "axios";

function SaleForm() {

  const [productos, setProductos] = useState([]);

  const [venta, setVenta] = useState({
    productoId: "",
    cantidad: ""
  });

  const obtenerProductos = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/productos"
    );

    setProductos(res.data);
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

        await axios.post(
        "http://localhost:5000/api/ventas",
        {
            productoId: venta.productoId,
            cantidad: Number(venta.cantidad)
        }
        );

        alert("Venta registrada");

        setVenta({
        productoId: "",
        cantidad: ""
        });

        obtenerProductos();

    } catch (error) {

        alert(error.response?.data?.mensaje || "Error");

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