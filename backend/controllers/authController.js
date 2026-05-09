const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {

  try {

    const {
      nombre,
      email,
      password
    } = req.body;

    const existeUsuario =
      await User.findOne({ email });

    if (existeUsuario) {
      return res.status(400).json({
        mensaje: "El usuario ya existe"
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const nuevoUsuario =
      new User({
        nombre,
        email,
        password: passwordHash
      });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const usuario =
      await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        mensaje: "Usuario no encontrado"
      });
    }

    const passwordCorrecto =
      await bcrypt.compare(
        password,
        usuario.password
      );

    if (!passwordCorrecto) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol
      },
      "secretoJWT",
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};

module.exports = {
  registrar,
  login
};