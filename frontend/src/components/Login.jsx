import { useState } from "react";
import axios from "axios";

function Login({ setAutenticado }) {

  const [paso, setPaso] =
    useState(1);

  const [datos, setDatos] =
    useState({
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]:
        e.target.value
    });

  };

  const continuar = () => {

    if (!datos.email) {

      alert(
        "Ingrese su correo"
      );

      return;

    }

    setPaso(2);

  };

  const volver = () => {

    setPaso(1);

  };

  const iniciarSesion =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const res =
          await axios.post(
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

        alert(
          "Bienvenido"
        );

        setAutenticado(true);

      } catch (error) {

        alert(
          error.response?.data
            ?.mensaje ||
          "Error al iniciar sesión"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="login-container">

      <div className="login-box">

        <div className="login-header">

          <h1>
            🏥 Nova Salud
          </h1>

          <p>
            Sistema Web de Gestión
          </p>

        </div>

        {/* PASO 1 */}

        {paso === 1 && (

          <div className="login-form">

            <div className="input-group">

              <label>
                Correo Electrónico
              </label>

              <input
                type="email"
                name="email"
                placeholder="Ingrese su correo"
                value={datos.email}
                onChange={handleChange}
              />

            </div>

            <button
              onClick={continuar}
            >
              Continuar
            </button>

          </div>

        )}

        {/* PASO 2 */}

        {paso === 2 && (

          <form
            className="login-form"
            onSubmit={
              iniciarSesion
            }
          >

            <div className="input-group">

              <label>
                Contraseña
              </label>

              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={
                  datos.password
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <div className="buttons">

              <button
                type="button"
                className="secondary"
                onClick={volver}
              >
                Volver
              </button>

              <button
                type="submit"
                disabled={loading}
              >

                {loading
                  ? "Ingresando..."
                  : "Iniciar Sesión"}

              </button>

            </div>

          </form>

        )}

      </div>

    </div>

  );

}

export default Login;