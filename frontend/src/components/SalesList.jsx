import { useEffect, useState } from "react";
import axios from "axios";

function SalesList() {

  const [ventas, setVentas] = useState([]);

  const obtenerVentas = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/ventas"
    );

    setVentas(res.data);
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <div>

      <h2>Historial de Ventas</h2>

      <table border="1">

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
                {new Date(
                  venta.fecha
                ).toLocaleDateString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SalesList;