// frontend/src/utils/ventasHelpers.js

export const agruparPorFecha = (data = []) => {

  const map = {};

  data.forEach(v => {

    const date = new Date(v.fecha);

    if (isNaN(date.getTime())) return;

    // normalizar día
    const key = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toISOString().split("T")[0];

    if (!map[key]) {
      map[key] = {
        fecha: key,
        total: 0,
        cantidad: 0
      };
    }

    map[key].total += v.total || 0;
    map[key].cantidad += v.cantidad || 0;
  });

  return Object.values(map);
};