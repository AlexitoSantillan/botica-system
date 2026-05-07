const express = require("express");

const router = express.Router();

const {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto
} = require("../controllers/productController");

router.post("/", crearProducto);

router.get("/", obtenerProductos);

router.delete("/:id", eliminarProducto);

router.put("/:id", actualizarProducto);
module.exports = router;  