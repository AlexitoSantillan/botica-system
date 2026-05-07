const Sale = require("../models/Sale");
const Product = require("../models/Product");

const registrarVenta = async (req, res) => {
  try {

    const { productoId, cantidad } = req.body;

    const producto = await Product.findById(
      productoId
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({
        mensaje: "Stock insuficiente"
      });
    }

    producto.stock -= cantidad;

    await producto.save();

    const nuevaVenta = new Sale({
      producto: producto.nombre,
      cantidad,
      total: producto.precio * cantidad
    });

    await nuevaVenta.save();

    res.status(201).json(nuevaVenta);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const obtenerVentas = async (req, res) => {
  try {

    const ventas = await Sale.find();

    res.json(ventas);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  registrarVenta,
  obtenerVentas
};