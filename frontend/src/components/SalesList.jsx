import { useEffect, useState } from "react";
import axios from "axios";

function SalesList() {

  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState(null);

  const obtenerVentas = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/ventas",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setVentas(res.data);

    } catch (err) {
      console.log(err);
      setError("Error cargando ventas");
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <div className="card">

      <h2>📊 Historial de Ventas</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table">

        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>

          {ventas.map((venta) => (
            <tr key={venta._id}>

              <td>{venta.producto}</td>

              <td>{venta.cantidad}</td>

              <td>S/. {venta.total}</td>

              <td>
                {new Date(venta.fecha).toLocaleString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SalesList;