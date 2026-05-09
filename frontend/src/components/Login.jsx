import { useState } from "react";
import axios from "axios";

function Login({ setAutenticado }) {

  const [datos, setDatos] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        datos
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          res.data.usuario
        )
      );

      alert("Login correcto");

      setAutenticado(true);

    } catch (error) {

      alert(
        error.response.data.mensaje
      );

    }

  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={datos.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={datos.password}
          onChange={handleChange}
        />

        <button type="submit">
          Ingresar
        </button>

      </form>

    </div>
  );
}

export default Login; 