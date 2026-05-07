import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ productos }) {

  const exportarPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Reporte Inventario Botica",
      14,
      15
    );

    const columnas = [
      "Nombre",
      "Categoría",
      "Precio",
      "Stock",
      "Vencimiento"
    ];

    const filas = productos.map(
      (producto) => [

        producto.nombre,
        producto.categoria,
        `S/. ${producto.precio}`,
        producto.stock,

        new Date(
          producto.fechaVencimiento
        ).toLocaleDateString()

      ]
    );

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 25
    });

    doc.save("inventario_botica.pdf");
  };

  return (
    <button
      onClick={exportarPDF}
      style={{
        background: "#2ecc71",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "15px"
      }}
    >
      Exportar PDF
    </button>
  );
}

export default ExportPDF;