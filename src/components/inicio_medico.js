import React, { useState } from "react";
import "../css/inicio.css";
import CrearPaciente from "../components/Crear_paciente";
import CrearHistoria from "../components/Registro_historia";
import Tratamiento from "../components/tratamientos";  // Importa el componente Tratamiento

// Importar imágenes
import crearPacienteImg from "../img2/usuario.png";
import gestionHistoriasImg from "../img2/historia.png";
import tratamientosImg from "../img2/tratamiento.png";
import headerImage from "../img2/image.png";
import { useNavigate } from "react-router-dom";

const InicioMedico = () => {
  const [activeForm, setActiveForm] = useState(null); // Estado para controlar qué formulario mostrar
  const navigate = useNavigate();

  // Renderizar el formulario según el estado activo
  // const renderForm = () => {
  //   switch (activeForm) {
  //     case "crearPaciente":
  //       return <CrearPaciente onCancel={() => setActiveForm(null)} />;
  //     case "crearHistoria":
  //       return <CrearHistoria onCancel={() => setActiveForm(null)} />;
  //     case "tratamiento":  // Asegúrate de que este coincida con el valor usado en onClick
  //       return <Tratamiento onCancel={() => setActiveForm(null)} />;
  //     default:
  //       return null;
  //   };

  return (
    <div className="inicio-container">
      {/* {!activeForm ? ( */}
      <>
        <nav className="navbar">
          <ul className="nav-items">
            <li><a href="#inicio">Inicio </a></li>
            <li><a href="#registro-paciente">Registro Paciente</a></li>
            <li><a href="#creacion-historia">Creación Historia</a></li>
            <li><a href="#crear-usuario">Visualizar Tratamiento</a></li>
          </ul>
        </nav>

        <div className="header">
          <img src={headerImage} alt="Header" className="header-image" />
        </div>

        <div className="modulos-container">
          <div
            className="modulo"
            // onClick={() => setActiveForm("crearPaciente")}  // Llama al formulario de Crear Paciente
            on onClick={() => navigate('/crear_paciente')}
          >
            <img src={crearPacienteImg} alt="Crear Paciente" />
            <p>Crear Paciente</p>
          </div>
          <div
            className="modulo"
            // onClick={() => setActiveForm("crearHistoria")}  // Llama al formulario de Gestión de Historias
            on onClick={() => navigate('/registro_historia')}
          >
            <img src={gestionHistoriasImg} alt="Gestión Historias" />
            <p>Gestión de Historias</p>
          </div>
          <div
            className="modulo"
            // onClick={() => setActiveForm("tratamiento")}  // Cambia el estado a "tratamiento" para llamar al componente Tratamiento
            on onClick={() => navigate('/tratamiento')}
          >
            <img src={tratamientosImg} alt="Tratamientos" />
            <p>Tratamientos</p>
          </div>
        </div>
      </>
      {/* // ) : (
      //   renderForm()  // Renderiza el formulario según el estado actual
      // )} */}
    </div>
  );
};

export default InicioMedico;
