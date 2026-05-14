import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ProductForm({ obtenerProductos }) {

  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    fechaVencimiento: ""
  });

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // 🔥 FIX IMPORTANTE: limpiar y convertir datos
      const dataToSend = {
        ...producto,
        precio: Number(producto.precio),
        stock: Number(producto.stock),
        fechaVencimiento: producto.fechaVencimiento
          ? new Date(producto.fechaVencimiento)
          : null
      };

      const res = await axios.post(
        "http://localhost:5000/api/productos",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✔ solo si realmente se guardó
      toast.success("Producto agregado correctamente");

      obtenerProductos();

      setProducto({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        fechaVencimiento: ""
      });

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.mensaje ||
        "Error al agregar producto"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={producto.categoria}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={producto.stock}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="fechaVencimiento"
        value={producto.fechaVencimiento}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Guardar Producto
      </button>

    </form>
  );
}

export default ProductForm;