import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {

  return (

    <>

      <footer className="footer">

        <p>
          Sistema de Botica Nova Salud
        </p>

        <p>
          Alex Santillan Developer - 2026
        </p>

      </footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </>

  );

}

export default Footer;