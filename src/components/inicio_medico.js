import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/inicio2.css";

// Importar imágenes
import crearPacienteImg from "../img2/usuario.png";
import gestionHistoriasImg from "../img2/historia.png";
import gestion from "../img2/gestion.png";


const InicioMedico = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="logo">Clínica Profesional</div>
        <ul className="nav-links">
          {/* Opciones en la barra de navegación, cada una redirige a una ruta */}
          <li onClick={() => navigate("/inicio")}>Inicio</li> {/* Regresar al inicio */}
          <li onClick={() => navigate("/crear-paciente")}>Crear Paciente</li>
          <li onClick={() => navigate("/gestion-historias")}>Registro Historias</li>
          <li onClick={() => navigate("/gestion")}>Gestión Historias</li>
          <li onClick={() => navigate("/")}>Cerrar Sesión</li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="content">
        <div className="welcome-container">
          <div className="text-box">
            <h1>Bienvenido al portal del médico</h1>
            <p>Seleccione una opción para gestionar los pacientes y sus tratamientos.</p>
          </div>
        </div>

        {/* Modulos de navegación */}
        <div className="modulos-container">
          <div
            className="modulo"
            onClick={() => navigate("/crear-paciente")}  // Redirige a la vista de Crear Paciente
          >
            <img src={crearPacienteImg} alt="Crear Paciente" />
            <p>Crear Paciente</p>
          </div>
          <div
            className="modulo"
            onClick={() => navigate("/gestion-historias")}  // Redirige a la vista de registro de Historias
          >
            <img src={gestionHistoriasImg} alt="Gestión Historias" />
            <p> Registro de Historias</p>
          </div>
          <div
            className="modulo"
            onClick={() => navigate("/gestion")}  // Redirige a la vista de Gestión de Historias
          >
            <img src={gestion} alt="Gestión Historias" />
            <p>Gestión de Historias</p>
          </div>
          {/* <div
            className="modulo"
            onClick={() => navigate("/tratamientos")}  // Redirige a la vista de Tratamientos
          >
            <img src={tratamientosImg} alt="Tratamientos" />
            <p>Tratamientos</p>
          </div> */}
          
        </div>
      </div>
    </div>
  );
};

export default InicioMedico;
