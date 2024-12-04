import React, { useState } from "react";
import "../css/inicio.css";
import Vista_medico from "../components/inicio_medico";
import CrearHistoria from "../components/Registro_historia";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";
import crearUsuarioImg from "../img2/usuario.png"; 
import headerImage from "../img2/image.png";

const Inicio = () => {
  const [activeForm, setActiveForm] = useState(null); // Estado para controlar qué formulario mostrar

  // Renderizar el formulario según el estado activo
  const renderForm = () => {
    switch (activeForm) {
      case "crearPaciente":
        return <Vista_medico onCancel={() => setActiveForm(null)} />;
      case "crearHistoria":
        return <CrearHistoria onCancel={() => setActiveForm(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="inicio-container">
      {!activeForm ? (
        <>
          <nav className="navbar">
            <ul className="nav-items">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#Vista medico">Vista Medico</a></li>
              <li><a href="#Registro de historia">Vista enfermera</a></li>
              <li><a href="#crear-usuario">Vista tratante</a></li>
              <li><a href="#crear-usuario">Crear Usuario</a></li>
            </ul>
          </nav>

          <div className="header">
            <img src={headerImage} alt="Header" className="header-image" />
          </div>

          <div className="modulos-container">
            <div
              className="modulo"
              onClick={() => setActiveForm("crearPaciente")}
            >
              <img src={crearPacienteImg} alt="Crear Paciente" />
              <p>Vista Medico</p>
            </div>
            <div
              className="modulo"
              onClick={() => setActiveForm("crearHistoria")}
            >
              <img src={gestionHistoriasImg} alt="Gestión Historias" />
              <p>Vista Enfermera</p>
            </div>
            <div className="modulo">
              <img src={tratamientosImg} alt="Tratamientos" />
              <p>Tratamientos</p>
            </div>
            <div className="modulo">
              <img src={crearUsuarioImg} alt="Crear Usuario" />
              <p>Crear Usuario</p>
            </div>
          </div>
        </>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default Inicio;
