import ExportPDF from "../components/ExportPDF";

function ReportesPage({
  productos
}) {

  return (
    <div className="card">
      <ExportPDF
        productos={productos}
      />
    </div>
  );
}

export default ReportesPage;