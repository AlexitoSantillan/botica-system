/////////////////////////////
// 📊 ANALYTICS DE VENTAS
/////////////////////////////

/**
 * Ventas por día
 */
export function ventasPorDia(ventas) {
  const map = {};

  ventas.forEach((v) => {
    const fecha = v.fecha;

    map[fecha] = (map[fecha] || 0) + v.total;
  });

  return Object.keys(map).map((fecha) => ({
    fecha,
    total: map[fecha],
  }));
}

/////////////////////////////

/**
 * Obtener semana del mes
 */
export function getSemanaDelMes(fechaStr) {
  const fecha = new Date(fechaStr);
  const inicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

  return Math.ceil((fecha.getDate() + inicioMes.getDay()) / 7);
}

/////////////////////////////

/**
 * Ventas por semana
 */
export function ventasPorSemana(ventas) {
  const map = {};

  ventas.forEach((v) => {
    const fecha = v.fecha;
    const key = `${fecha.slice(0, 7)}-W${getSemanaDelMes(fecha)}`;

    map[key] = (map[key] || 0) + v.total;
  });

  return Object.keys(map).map((semana) => ({
    semana,
    total: map[semana],
  }));
}

/////////////////////////////

/**
 * Ventas por mes
 */
export function ventasPorMes(ventas) {
  const map = {};

  ventas.forEach((v) => {
    const mes = v.fecha.slice(0, 7); // YYYY-MM

    map[mes] = (map[mes] || 0) + v.total;
  });

  return Object.keys(map).map((mes) => ({
    mes,
    total: map[mes],
  }));
}

/////////////////////////////

/**
 * Ventas por año
 */
export function ventasPorAnio(ventas) {
  const map = {};

  ventas.forEach((v) => {
    const anio = v.fecha.slice(0, 4);

    map[anio] = (map[anio] || 0) + v.total;
  });

  return Object.keys(map).map((anio) => ({
    anio,
    total: map[anio],
  }));
}

/////////////////////////////

/**
 * Filtrar ventas por fecha exacta
 */
export function filtrarVentasPorFecha(ventas, fecha) {
  return ventas.filter((v) => v.fecha === fecha);
}

/////////////////////////////

/**
 * Producto más vendido
 */
export function productoMasVendido(ventas) {
  const map = {};

  ventas.forEach((v) => {
    v.productos?.forEach((p) => {
      map[p.nombre] = (map[p.nombre] || 0) + p.cantidad;
    });
  });

  const result = Object.entries(map).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
  }));

  return result.sort((a, b) => b.cantidad - a.cantidad)[0];
}

/////////////////////////////

/**
 * Total de ingresos
 */
export function totalIngresos(ventas) {
  return ventas.reduce((acc, v) => acc + v.total, 0);
}

/////////////////////////////

/**
 * Promedio de ventas por día
 */
export function promedioVentasDiarias(ventas) {
  if (!ventas.length) return 0;

  const dias = new Set(ventas.map((v) => v.fecha)).size;

  const total = totalIngresos(ventas);

  return total / dias;
}