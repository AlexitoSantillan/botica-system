const Product = require("../models/Product");

// ================= CREATE =================
const crearProducto = async (req, res) => {
  try {
    const data = {
      ...req.body,
      precio: Number(req.body.precio),
      stock: Number(req.body.stock),
      fechaVencimiento: req.body.fechaVencimiento
        ? new Date(req.body.fechaVencimiento)
        : null
    };

    const nuevoProducto = new Product(data);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json(productoGuardado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
};

// ================= READ =================
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// ================= DELETE =================
const eliminarProducto = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: "Producto eliminado"
    });

  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// ================= UPDATE =================
const actualizarProducto = async (req, res) => {
  try {
    const data = {
      ...req.body,
      precio: Number(req.body.precio),
      stock: Number(req.body.stock),
      fechaVencimiento: req.body.fechaVencimiento
        ? new Date(req.body.fechaVencimiento)
        : null
    };

    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(productoActualizado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto
};