function Navbar({
  setAutenticado,
  darkMode,
  setDarkMode
}) {

  const cerrarSesion = () => {
    setAutenticado(false);
  };

  return (
    <nav className="navbar">

      <h2>
        Botica Nova Salud
      </h2>

      <div className="navbar-right">

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>

        <span>
          Administrador
        </span>

        <button onClick={cerrarSesion}>
          Cerrar Sesión
        </button>

      </div>

    </nav>
  );
}

export default Navbar;