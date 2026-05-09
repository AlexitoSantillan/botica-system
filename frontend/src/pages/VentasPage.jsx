import SaleForm from "../components/SaleForm";
import SalesList from "../components/SalesList";

function VentasPage() {

  return (
    <>
      <div className="card">
        <SaleForm />
      </div>

      <div className="card">
        <SalesList />
      </div>
    </>
  );
}

export default VentasPage;