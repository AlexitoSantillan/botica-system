import { useEffect, useState } from "react";
import axios from "axios";

function SalesList() {

  const [ventas, setVentas] =
    useState([]);

  const obtenerVentas =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/ventas",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setVentas(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    obtenerVentas();

    const intervalo =
      setInterval(() => {

        obtenerVentas();

      }, 1000);

    return () =>
      clearInterval(
        intervalo
      );

  }, []);

  return (

    <div>

      <h2>
        Historial de Ventas
      </h2>

      <table border="1">

        <thead>

          <tr>

            <th>
              Producto
            </th>

            <th>
              Cantidad
            </th>

            <th>
              Total
            </th>

            <th>
              Fecha
            </th>

          </tr>

        </thead>

        <tbody>

          {ventas.map(
            (venta) => (

              <tr
                key={venta._id}
              >

                <td>

                  {venta.producto ||
                    venta.productoId
                      ?.nombre ||
                    "Sin nombre"}

                </td>

                <td>
                  {
                    venta.cantidad
                  }
                </td>

                <td>
                  S/. {
                    venta.total
                  }
                </td>

                <td>

                  {new Date(
                    venta.fecha
                  ).toLocaleString()}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default SalesList;