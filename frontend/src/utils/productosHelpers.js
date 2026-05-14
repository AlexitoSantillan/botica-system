
// =========================
// TOP PRODUCTOS VENDIDOS
// =========================
export const topProductosVendidos = (ventas = [], limit = 10) => {

  const map = {};

  ventas.forEach(v => {

    const nombre = v.producto || "Sin nombre";

    if (!map[nombre]) {
      map[nombre] = {
        producto: nombre,
        cantidad: 0,
        total: 0
      };
    }

    map[nombre].cantidad += v.cantidad || 0;
    map[nombre].total += v.total || 0;
  });

  return Object.values(map)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, limit);
};



// =========================
// STOCK BAJO
// =========================
export const stockBajo = (productos = [], limite = 5) => {

  return productos.filter(p => (p.stock || 0) < limite);
};



// =========================
// PRODUCTOS POR VENCER
// =========================
export const productosPorVencer = (productos = [], diasLimite = 30) => {

  const ahora = new Date();

  return productos.filter(p => {

    if (!p.fechaVencimiento) return false;

    const fecha = new Date(p.fechaVencimiento);

    const dias =
      (fecha.getTime() - ahora.getTime()) /
      (1000 * 60 * 60 * 24);

    return dias > 0 && dias <= diasLimite;
  });
};



// =========================
// CANTIDAD VENDIDA POR PRODUCTO
// =========================
export const cantidadPorProducto = (ventas = []) => {

  const map = {};

  ventas.forEach(v => {

    const nombre = v.producto || "Sin nombre";

    if (!map[nombre]) {
      map[nombre] = {
        nombre,
        cantidad: 0
      };
    }

    map[nombre].cantidad += v.cantidad || 0;
  });

  return Object.values(map)
    .sort((a, b) => b.cantidad - a.cantidad);
};