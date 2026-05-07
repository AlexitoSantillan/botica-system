import { useState } from "react";
import axios from "axios";

function ProductForm() {
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

    await axios.post(
      "http://localhost:5000/api/productos",
      producto
    );

    alert("Producto agregado");

    setProducto({
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      fechaVencimiento: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={handleChange}
      />

      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={producto.categoria}
        onChange={handleChange}
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={producto.stock}
        onChange={handleChange}
      />

      <input
        type="date"
        name="fechaVencimiento"
        value={producto.fechaVencimiento}
        onChange={handleChange}
      />

      <button type="submit">
        Guardar Producto
      </button>
    </form>
  );
}

export default ProductForm;