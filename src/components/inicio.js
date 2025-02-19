import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/inicio.css";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import crearUsuarioImg from "../img2/usuario.png";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Clínica Profesional</div>
        <ul className="nav-links">
          <li onClick={() => navigate("/vista-medico")}>Vista Médico</li>
          <li onClick={() => navigate("/vista-enfermera")}>Vista Enfermera</li>
          <li onClick={() => navigate("/personal")}>Personal</li>
          <li onClick={() => navigate("/exportacion")}>Explotación</li>
          <li onClick={() => navigate("/")}> Cerrar Sesión</li> {/* el cierre de sesion deberia ser eliminando la sesion desde el backend*/}
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="content">
        <div className="welcome-container">
          <div className="text-box">
            <h1>Bienvenido a nuestra clínica</h1>
            <p>Por favor, selecciona una opción para continuar</p>
          </div>
        </div>

        <div className="modulos-container">
          <div className="modulo" onClick={() => navigate("/vista-medico")}>
            <img src={crearPacienteImg} alt="Vista Médico" />
            <p>Vista Médico</p>
          </div>
          <div className="modulo" onClick={() => navigate("/vista-enfermera")}>
            <img src={gestionHistoriasImg} alt="Vista Enfermera" />
            <p>Vista Enfermera</p>
          </div>
          {/* <div className="modulo" onClick={() => navigate("/tratamientos")}>  
            <img src={tratamientosImg} alt="Tratamientos" />
            <p>Tratamientos</p>
          </div> */}
          <div className="modulo"
            onClick={() => navigate('/personal')} // Redirige a la página 'tratamiento'
            >
            <img src={crearUsuarioImg} alt="" />
            <p>Personal</p>
          </div>
          <div className="modulo"
            onClick={() => navigate('/exportacion')} // Redirige a la página 'personal'
          >
            <img src={crearUsuarioImg} alt="" />
            <p>Exportacion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
