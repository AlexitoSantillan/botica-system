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

      // 🔥 FIX IMPORTANTE: convertir fecha vacía a null o eliminar error
      const dataToSend = {
        ...producto,
        precio: Number(producto.precio),
        stock: Number(producto.stock),
        fechaVencimiento: producto.fechaVencimiento || null
      };

      await axios.post(
        "http://localhost:5000/api/productos",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Producto agregado");

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
      toast.error("Error al agregar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">

      <input name="nombre" placeholder="Nombre"
        value={producto.nombre}
        onChange={handleChange}
      />

      <input name="categoria" placeholder="Categoría"
        value={producto.categoria}
        onChange={handleChange}
      />

      <input type="number" name="precio" placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
      />

      <input type="number" name="stock" placeholder="Stock"
        value={producto.stock}
        onChange={handleChange}
      />

      <input type="date" name="fechaVencimiento"
        value={producto.fechaVencimiento}
        onChange={handleChange}
      />

      <button type="submit">Guardar Producto</button>

    </form>
  );
}

export default ProductForm;