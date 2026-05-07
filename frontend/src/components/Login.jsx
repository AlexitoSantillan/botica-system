import { useState } from "react";

function Login({ setAutenticado }) {

  const [usuario, setUsuario] =
    useState("");

  const [password, setPassword] =
    useState("");

  const iniciarSesion = (e) => {

    e.preventDefault();

    if (
      usuario === "admin" &&
      password === "123456"
    ) {

      setAutenticado(true);

    } else {

      alert("Credenciales incorrectas");

    }
  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={iniciarSesion}
      >

        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) =>
            setUsuario(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Ingresar
        </button>

      </form>

    </div>
  );
}

export default Login;