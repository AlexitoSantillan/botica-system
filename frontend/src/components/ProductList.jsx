import { useState } from "react";
import axios from "axios";

function ProductList({
  productos,
  obtenerProductos
}) {

  const [editando, setEditando] =
    useState(null);

  const [busqueda, setBusqueda] =
    useState("");

  const [formulario, setFormulario] =
    useState({
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      fechaVencimiento: ""
    });

  const productosFiltrados =
    productos.filter((producto) =>
      producto.nombre
        ?.toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  const eliminarProducto = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/productos/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      obtenerProductos();

    } catch (error) {

      console.log(error);

      alert(
        "Error al eliminar producto"
      );

    }

  };

  const editarProducto = (producto) => {

    setEditando(producto._id);

    setFormulario({
      nombre:
        producto.nombre || "",

      categoria:
        producto.categoria || "",

      precio:
        producto.precio || "",

      stock:
        producto.stock || "",

      fechaVencimiento:
        producto.fechaVencimiento
          ? new Date(
              producto.fechaVencimiento
            )
              .toISOString()
              .split("T")[0]
          : ""
    });

  };

  const handleChange = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]:
        e.target.value
    });

  };

  const guardarCambios =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.put(
          `http://localhost:5000/api/productos/${editando}`,
          formulario,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setEditando(null);

        obtenerProductos();

        alert(
          "Producto actualizado"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error al actualizar"
        );

      }

    };

  return (

    <div>

      <h2>Inventario</h2>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(
            e.target.value
          )
        }
      />

      <table border="1">

        <thead>

          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Existencias</th>
            <th>Vencimiento</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {productosFiltrados.map(
            (producto) => (

              <tr key={producto._id}>

                <td>

                  {editando ===
                  producto._id ? (

                    <input
                      type="text"
                      name="nombre"
                      value={
                        formulario.nombre
                      }
                      onChange={
                        handleChange
                      }
                    />

                  ) : (

                    producto.nombre

                  )}

                </td>

                <td>

                  {editando ===
                  producto._id ? (

                    <input
                      type="text"
                      name="categoria"
                      value={
                        formulario.categoria
                      }
                      onChange={
                        handleChange
                      }
                    />

                  ) : (

                    producto.categoria

                  )}

                </td>

                <td>

                  {editando ===
                  producto._id ? (

                    <input
                      type="number"
                      name="precio"
                      value={
                        formulario.precio
                      }
                      onChange={
                        handleChange
                      }
                    />

                  ) : (

                    `S/. ${producto.precio}`

                  )}

                </td>

                <td>

                  {editando ===
                  producto._id ? (

                    <input
                      type="number"
                      name="stock"
                      value={
                        formulario.stock
                      }
                      onChange={
                        handleChange
                      }
                    />

                  ) : (

                    <>

                      {producto.stock}

                      {producto.stock < 5 && (
                        <span
                          style={{
                            color: "red",
                            display: "block"
                          }}
                        >
                          Stock Bajo
                        </span>
                      )}

                    </>

                  )}

                </td>

                <td>

                  {editando ===
                  producto._id ? (

                    <input
                      type="date"
                      name="fechaVencimiento"
                      value={
                        formulario.fechaVencimiento
                      }
                      onChange={
                        handleChange
                      }
                    />

                  ) : (

                    <>

                      {producto.fechaVencimiento &&
                        new Date(producto.fechaVencimiento) <
                          new Date(
                            Date.now() +
                            7 * 24 * 60 * 60 * 1000
                          ) && (
                          <span
                            style={{
                              color: "orange",
                              display: "block"
                            }}
                          >
                            Próximo a vencer
                          </span>
                      )}

                    </>

                  )}

                </td>

                <td>

                  {editando ===
                  producto._id ? (

                    <button
                      type="button"
                      style={{
                        background:
                          "green",
                        color:
                          "white",
                        marginRight:
                          "5px",
                        padding:
                          "8px 12px",
                        border:
                          "none",
                        borderRadius:
                          "5px",
                        cursor:
                          "pointer"
                      }}
                      onClick={
                        guardarCambios
                      }
                    >
                      Guardar
                    </button>

                  ) : (

                    <button
                      type="button"
                      style={{
                        background:
                          "#3498db",
                        color:
                          "white",
                        marginRight:
                          "5px",
                        padding:
                          "8px 12px",
                        border:
                          "none",
                        borderRadius:
                          "5px",
                        cursor:
                          "pointer"
                      }}
                      onClick={() =>
                        editarProducto(
                          producto
                        )
                      }
                    >
                      Editar
                    </button>

                  )}

                  <button
                    type="button"
                    style={{
                      background:
                        "red",
                      color:
                        "white",
                      padding:
                        "8px 12px",
                      border:
                        "none",
                      borderRadius:
                        "5px",
                      cursor:
                        "pointer"
                    }}
                    onClick={() =>
                      eliminarProducto(
                        producto._id
                      )
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default ProductList;