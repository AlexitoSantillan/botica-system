import Dashboard from "../components/Dashboard";
import StatsChart from "../components/StatsChart";
import SalesBarChart from "../components/SalesBarChart";

function DashboardPage({
  productos,
  ventas
}) {

  return (

    <>

      <Dashboard
        productos={productos}
      />

      <div className="card">

        <StatsChart
          productos={productos}
        />

      </div>

      <SalesBarChart
        ventas={ventas}
      />

    </>

  );

}

export default DashboardPage;