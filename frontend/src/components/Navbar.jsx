function Navbar({ setAutenticado }) {

  const cerrarSesion = () => {
    setAutenticado(false);
  };

  return (
    <nav className="navbar">

      <h2>
        Botica Nova Salud
      </h2>

      <div className="navbar-right">

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