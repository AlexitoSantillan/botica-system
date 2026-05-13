import { useEffect } from "react";

import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function ProductosPage({
  productos,
  obtenerProductos
}) {

  useEffect(() => {

    obtenerProductos();

  }, []);

  return (

    <>

      <div className="card">

        <ProductForm
          obtenerProductos={
            obtenerProductos
          }
        />

      </div>

      <div className="card">

        <ProductList
          productos={productos}
          obtenerProductos={
            obtenerProductos
          }
        />

      </div>

    </>

  );

}

export default ProductosPage;