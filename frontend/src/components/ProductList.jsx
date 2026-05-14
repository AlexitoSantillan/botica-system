import { useState } from "react";
import axios from "axios";

function ProductList({ productos = [], obtenerProductos }) {

  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    fechaVencimiento: ""
  });

  // FILTRO
  const productosFiltrados = productos.filter((p) =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // EDITAR
  const editarProducto = (producto) => {
    setEditando(producto._id);

    setFormulario({
      nombre: producto.nombre ?? "",
      categoria: producto.categoria ?? "",
      precio: producto.precio ?? "",
      stock: producto.stock ?? "",
      fechaVencimiento: producto.fechaVencimiento
        ? new Date(producto.fechaVencimiento).toISOString().split("T")[0]
        : ""
    });
  };

  // CHANGE
  const handleChange = (e) => {
    setFormulario((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // CANCELAR
  const cancelarEdicion = () => {
    setEditando(null);
  };

  // GUARDAR
  const guardarCambios = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/productos/${editando}`,
        {
          ...formulario,
          precio: Number(formulario.precio),
          stock: Number(formulario.stock),
          fechaVencimiento: formulario.fechaVencimiento || null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEditando(null);
      obtenerProductos();

    } catch (error) {
      console.log(error);
      alert("Error al actualizar producto");
    }
  };

  // ELIMINAR
  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/productos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      obtenerProductos();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">

      <h2>📦 Inventario</h2>

      <input
        className="input-busqueda"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div style={{ overflowX: "auto" }}>

        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.map((producto) => (
              <tr
                key={`${producto._id}-${editando === producto._id ? "edit" : "view"}`}
              >

                <td>
                  {editando === producto._id ? (
                    <input
                      name="nombre"
                      value={formulario.nombre}
                      onChange={handleChange}
                    />
                  ) : (
                    producto.nombre
                  )}
                </td>

                <td>
                  {editando === producto._id ? (
                    <input
                      name="categoria"
                      value={formulario.categoria}
                      onChange={handleChange}
                    />
                  ) : (
                    producto.categoria
                  )}
                </td>

                <td>
                  {editando === producto._id ? (
                    <input
                      type="number"
                      name="precio"
                      value={formulario.precio}
                      onChange={handleChange}
                    />
                  ) : (
                    `S/. ${producto.precio}`
                  )}
                </td>

                <td>
                  {editando === producto._id ? (
                    <input
                      type="number"
                      name="stock"
                      value={formulario.stock}
                      onChange={handleChange}
                    />
                  ) : (
                    <>
                      {producto.stock}

                      {producto.stock < 10 && (
                        <span style={{ color: "red", display: "block" }}>
                          Stock Bajo
                        </span>
                      )}
                    </>
                  )}
                </td>

                <td>
                  {editando === producto._id ? (
                    <input
                      type="date"
                      name="fechaVencimiento"
                      value={formulario.fechaVencimiento}
                      onChange={handleChange}
                    />
                  ) : (
                    producto.fechaVencimiento
                      ? new Date(producto.fechaVencimiento).toLocaleDateString()
                      : "Sin fecha"
                  )}
                </td>

                <td>
                  {editando === producto._id ? (
                    <>
                      <button
                        type="button"
                        style={{ background: "green", color: "white" }}
                        onClick={guardarCambios}
                      >
                        Guardar
                      </button>

                      <button
                        type="button"
                        style={{ background: "gray", color: "white", marginLeft: 5 }}
                        onClick={cancelarEdicion}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      style={{ background: "#3498db", color: "white" }}
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>
                  )}

                  <button
                    type="button"
                    style={{ background: "red", color: "white", marginLeft: 5 }}
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ProductList;