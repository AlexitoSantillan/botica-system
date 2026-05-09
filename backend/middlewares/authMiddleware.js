const jwt = require("jsonwebtoken");

const verificarToken = (
  req,
  res,
  next
) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      mensaje: "Token requerido"
    });

  }

  try {

    const token =
      authHeader.split(" ")[1];

    const verificado =
      jwt.verify(
        token,
        "secretoJWT"
      );

    req.usuario = verificado;

    next();

  } catch (error) {

    res.status(401).json({
      mensaje: "Token inválido"
    });

  }

};

module.exports =
  verificarToken;