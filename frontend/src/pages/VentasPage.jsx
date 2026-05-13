import SaleForm from "../components/SaleForm";
import SalesList from "../components/SalesList";

function VentasPage({
  obtenerProductos
}) {

  return (

    <>

      <div className="card">

        <SaleForm
          obtenerProductos={
            obtenerProductos
          }
        />

      </div>

      <div className="card">

        <SalesList />

      </div>

    </>

  );

}

export default VentasPage;