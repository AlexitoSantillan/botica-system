const Product = require("../models/Product");

const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);

    const productoGuardado = await nuevoProducto.save();

    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();

    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: "Producto eliminado"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto
};