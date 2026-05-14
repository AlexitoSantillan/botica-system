
// =========================
// KPIs DEL DASHBOARD
// =========================
export const calcularKPIs = (productos = [], ventas = []) => {

  // 📦 total productos
  const totalProductos = productos.length;

  // ⚠️ stock bajo
  const stockBajo = productos.filter(p => (p.stock || 0) < 5).length;

  // ⏰ por vencer (30 días)
  const ahora = new Date();

  const porVencer = productos.filter(p => {

    if (!p.fechaVencimiento) return false;

    const fecha = new Date(p.fechaVencimiento);

    const dias =
      (fecha.getTime() - ahora.getTime()) /
      (1000 * 60 * 60 * 24);

    return dias > 0 && dias <= 30;
  }).length;

  // 💰 total ventas
  const totalVentas = ventas.length;

  // 🧾 ingresos
  const ingresos = ventas.reduce(
    (acc, v) => acc + (v.total || 0),
    0
  );

  return {
    totalProductos,
    stockBajo,
    porVencer,
    totalVentas,
    ingresos
  };
};