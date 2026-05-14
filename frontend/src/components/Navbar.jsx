function Navbar({
  setAutenticado,
  darkMode,
  setDarkMode,
  setVista
}) {

  const usuario =
    JSON.parse(
      localStorage.getItem(
        "usuario"
      )
    );

  const cerrarSesion = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "usuario"
    );

    setAutenticado(false);

  };

  return (

    <nav className="navbar">

      <div className="navbar-logo">
        🏥 Botica Nova Salud
      </div>

      <ul className="navbar-links">

        <li>
          <button
            onClick={() =>
              setVista("inicio")
            }
          >
            Inicio
          </button>
        </li>

        <li>
          <button
            onClick={() =>
              setVista("productos")
            }
          >
            Productos
          </button>
        </li>

        <li>
          <button
            onClick={() =>
              setVista("ventas")
            }
          >
            Ventas
          </button>
        </li>

        <li>
          <button
            onClick={() =>
              setVista("reportes")
            }
          >
            Informes
          </button>
        </li>

        <li>
          <button
            onClick={() =>
              setVista("soporte")
            }
          >
            Soporte
          </button>
        </li>

      </ul>

      <div className="navbar-right">

        <button
          className="dark-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {darkMode
            ? "☀️ Claro"
            : "🌙 Oscuro"}

        </button>

          <span className="admin-text">

            👤 {usuario?.nombre}

            {" - "}

            {
              usuario?.rol === "admin"
                ? "Administrador"
                : "Vendedor"
            }

          </span>

        <button
          className="logout-btn"
          onClick={cerrarSesion}
        >
          🚪 Salir
        </button>

      </div>

    </nav>

  );

}

export default Navbar;