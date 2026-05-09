const verificarToken =
  require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

const {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto
} = require("../controllers/productController");

router.post(
  "/",
  verificarToken,
  crearProducto
);

router.get(
  "/",
  verificarToken,
  obtenerProductos
);

router.delete(
  "/:id",
  verificarToken,
  eliminarProducto
);

router.put(
  "/:id",
  verificarToken,
  actualizarProducto
);

module.exports = router;